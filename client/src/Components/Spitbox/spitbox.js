import React, {Component, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import io from "socket.io-client";

// Components
import SpitboxTemplate from "../../layouts/spitbox/SpitboxTemplate";

// Define socket
const socket = io('http://localhost:3000',{
    forceNew: false
});

// On disconnect
socket.on('disconnect', () => {
    console.log('Disconnected from the server.');
});

// Event: New messages from the server
socket.on('newMessage', (message) => {

    // Format the timestamp
    const time = moment(message.createdAt).format('h:mm a');
    // Grab dialog box
    const messages = document.querySelector('#messages');
    // Set the template
    const output = `
    <li class="foreign">
        <div class="avatar">
            <div class="status online"></div>
        </div>
        <div class="message-bubble">
            <div class="username">${message.from}</div>
            <div class="message">
                ${message.text}
            </div>
        </div>
    </li>`;
    // Output the message
    messages.insertAdjacentHTML("beforeend", output);
    // Autoscroll
    autoscroll();
});

// Autoscroll
const autoscroll = () => {
    // Selectors
    const messages = document.querySelector('#messages');
    const allowance = messages.lastChild;
    // Heights
    const clientHeight = messages.clientHeight;
    const scrollTop = messages.scrollTop;
    const scrollHeight = messages.scrollHeight;
    // If the user is near the bottom, auto scroll to bottom.
    if (clientHeight + scrollTop + allowance.clientHeight * 4 >= scrollHeight) {
        messages.scrollTop = scrollHeight;
    }
};

const Spitbox = () => {

    // Init state
    const [message, setMessage] = useState('');
    const [battleTimer, setBattleTimer] = useState({
        started: false,
        count: 0
    });
    const [voteBtn, setVoteBtn] = useState(false);

    // Grab state from redux store
    const username = useSelector(state => state.user.user.user.name);
    console.log('Redux data is: ', username);

    useEffect(() => {
        // On connect
        socket.on('connect', () => {
            console.log('Connected to the server.');
        });

        socket.emit('join', {
            user: username,
            room: 'general'
        });
    }, []);

    // Control message input
    const handleChange = (e) => {
        setMessage(e.target.value)
    };

    // Send data to server on enter/submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // Clear the input value
        const messageInput = document.querySelector('#message');
        messageInput.value = '';
        // Clear the state
        setMessage('');
        // Event: Send message
        socket.emit('createMessage',{
            text: message
        }, () => {
            console.log('ok some call back here.');
        });
    };

    // Event Request: Coin flip
    const coinFlip = (e) => {
        console.log('requested flip');
        e.preventDefault();
        socket.emit('flip');
    };

    // Event: Coin flip
    socket.on('coinFlip', (result) => {
        // Grab dialog box
        const messages = document.querySelector('#messages');
        // Set the template
        const output = `<li class="message broadcast">${result.result}</li>`;
        // Output the result
        messages.insertAdjacentHTML("beforeend", output);
    });

    // Event Request: Start battle
    const startBattle = (e) => {
        e.preventDefault();
        socket.emit('startBattle');
    };

    // Event: Start Battle
    socket.on('startBattle', (result) => {
        // Update the counter
        setBattleTimer({
            started: true,
            count: result.result
        });
        if (result.result){
            startTimer()
        }
    });

    // Timer
    const startTimer = () => {
        let counter = 30;
        const timer = document.getElementById('timer');
        const startBattleRap = setInterval(() => {
            timer.innerHTML = counter;
            counter--;
            if(counter <= 5){
               timer.style.color = 'red'
            }
            if(counter < 0){
                clearInterval(startBattleRap);
                socket.emit('startVote');
            }
        }, 1000)
    };

    // Start Voting
    socket.on('votingOpen', () => {
        console.log('Voting has started.');
        setVoteBtn(true);
    });

    // Close voting
    socket.on('votingClosed', () => {
        setVoteBtn(false);
    });

    const submitVote = (vote) => {
      socket.emit('vote', vote);
    };

    return(
        <SpitboxTemplate>
                <span id="timer"></span>
                <ol id="messages"></ol>
                <footer>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="message"
                            name="message"
                            placeholder="Type a message..."
                            onChange={handleChange}
                            autoComplete="off"
                            autoFocus="on"
                        />
                        <button type="submit" id={`send-message`} disabled={message ? false : true}>

                            <lord-icon
                                animation="loop"
                                palette="#433a55;#433a55"
                                target="a"
                                size={'10px'}
                                src={`../../assets/icons/143-paper-plane/143-paper-plane-outline.json`}>
                            </lord-icon>
                        </button>
                    </form>
                    <button id="coin-flip" onClick={(e) => coinFlip(e)}>Flip</button>
                    <button onClick={startBattle}>Start Battle</button>
                    {voteBtn ? <button onClick={(e) => submitVote('Canibus')}>Cast vote</button> : null}
                </footer>
        </SpitboxTemplate>
    )
};


export default Spitbox;