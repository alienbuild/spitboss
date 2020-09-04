import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from "socket.io-client";

// Components
import SpitboxTemplate from "../../layouts/spitbox/SpitboxTemplate";
import MessageBubble from "./MessageBubble";

const Spitbox = () => {

    // Init state
    const [yourID, setYourID] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [battleTimer, setBattleTimer] = useState({
        started: false,
        count: 0
    });
    const [voteBtn, setVoteBtn] = useState(false);

    // Grab state from redux store
    const username = useSelector(state => state.user.user.user.name);
    console.log('Redux data is: ', username);

    // Create socket ref
    const socket = useRef();

    useEffect(() => {
        // Connect to socket io
        socket.current = io.connect('http://localhost:3000');

        // Grab socket ID
        socket.current.on("socketId", socketId => {
            setYourID(socketId);
        });

        // Event: New messages from the server
        socket.current.on('newMessage', (message) => {
            receivedMessage(message);
            // Autoscroll
            autoscroll();
        });

        // Join room 'General' for now. TODO: Make dynamic room joins
        socket.current.emit('join', {
            user: username,
            room: 'general'
        });

        // Question/Poll test
        socket.current.on('news', function (data, ack) {
            console.log(data);
            if(ack){
                ack("acknowledge from client");
            }
        });

        // Start Voting
        socket.current.on('votingOpen', () => {
            console.log('Voting has started.');
            setVoteBtn(true);
        });

        // Close voting
        socket.current.on('votingClosed', () => {
            setVoteBtn(false);
        });

        socket.current.on('startBattle', (result) => {
            // Update the counter
            setBattleTimer({
                started: true,
                count: result.result
            });
            if (result.result){
                startTimer()
            }
        });

        // Event: Coin flip
        socket.current.on('coinFlip', (result) => {
            // Grab dialog box
            const messages = document.querySelector('#messages');
            // Set the template
            const output = `<li class="message broadcast">${result.result}</li>`;
            // Output the result
            messages.insertAdjacentHTML("beforeend", output);
        });


    }, []);

    const receivedMessage = (message) => {
        setMessages(oldMsgs => [...oldMsgs, message]);
    };

    // Autoscroll to bottom of chat messages
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
        socket.current.emit('createMessage',{
            text: message
        }, () => {
            console.log('ok some call back here.');
        });
    };

    // Event Request: Coin flip
    const coinFlip = (e) => {
        console.log('requested flip');
        e.preventDefault();
        socket.current.emit('flip');
    };

    // Event Request: Start battle
    const startBattle = (e) => {
        e.preventDefault();
        socket.current.emit('startBattle');
    };

    // Event: Start Battle
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
                socket.current.emit('startVote');
            }
        }, 1000)
    };

    // Handle vote
    const submitVote = (vote) => {
      socket.current.emit('vote', vote);
    };

    return(
        <SpitboxTemplate>
                <span id="timer"></span>
                <ol id="messages">
                    {messages && messages.map((message, index) => (<MessageBubble message={message} index={index} yourID={yourID} />))}
                </ol>
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
                        <button type="submit" id={`send-message`} disabled={!message}>

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