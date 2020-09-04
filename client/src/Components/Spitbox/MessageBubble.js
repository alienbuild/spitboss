import SpitbossLogo from "../../assets/images/spitboss.svg";
import React from "react";

const MessageBubble = (message, index, yourID) => {

    console.log('Message is: ', message);

    const messageClick = (socketRequest) => {
        console.log('User wants to message or view profile of ' + socketRequest);
    };

    return(
        <li
            key={index}
            className={`
                                ${message.message.socketId === yourID ? 'domestic' : 'foreign'}
                                ${message.message.socketId === 'admin' ? 'spitboss' : null}
                                `}
        >
            <div className="avatar">
                <div className="status online"></div>
                {message.message.socketId === 'admin' ? <img src={SpitbossLogo} /> : null}
            </div>
            <div className="message-bubble">
                <div className="username">
                    <button onClick={() => messageClick(message.message.socketId)}>
                        {message.message.from}
                    </button>
                </div>
                <div className="message">
                    {message.message.text}
                </div>
            </div>
        </li>
    )
};

export default MessageBubble;