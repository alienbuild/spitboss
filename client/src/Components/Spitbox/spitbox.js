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
            console.log('Setting your socket id.', socketId);
            setYourID(socketId); // TODO: Save socket id to redux
        });

        // Event: Disconnect
        socket.current.on('disconnect', () => {
            console.log('Disconnected from server.');
            socket.leave('general');
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

    // Handle vote
    const submitVote = (vote) => {
      socket.current.emit('vote', vote);
    };

    return(
        <SpitboxTemplate socket={socket} setMessages={setMessages}>
                <ol id="messages">
                    {messages && messages.map((message, index) => (<MessageBubble message={message} key={index} yourID={yourID} />))}
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
                    {voteBtn ? <button onClick={(e) => submitVote('Canibus')}>Cast vote</button> : null}
                </footer>
        </SpitboxTemplate>
    )
};


export default Spitbox;