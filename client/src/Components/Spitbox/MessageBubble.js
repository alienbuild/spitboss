import SpitbossLogo from "../../assets/images/spitboss.svg";
import React, {useEffect} from "react";
import ReactEmoji from 'react-emoji';
import ReactAutolink from 'react-autolink';

const MessageBubble = (message, yourID) => {

    const messageClick = (socketRequest) => {
        console.log('User wants to message or view profile of ' + socketRequest);
    };

    return(
        <li
            className={`
                ${message.message.socketId === yourID ? 'domestic' : 'foreign'}
                ${message.message.socketId === 'admin' ? 'spitboss' : null}
                `}
        >
            <div className="avatar">
                <span className="status online"></span>
                {message.message.socketId === 'admin' ? <img src={SpitbossLogo} alt={`Spitboss`} /> : null}
            </div>
            <div className="message-bubble">
                <div className="username">
                    <button onClick={() => messageClick(message.message.socketId)}>
                        {message.message.from}
                    </button>
                </div>
                <div className="message">
                    {
                        ReactAutolink.autolink(message.message.text, { target: "_blank", rel: "nofollow" }).map(el => {
                            if (typeof el === "string"){
                                return ReactEmoji.emojify(el, {
                                    attributes: {
                                        className: 'spitbox-emoji'
                                    }
                                });
                            } else {
                                return el;
                            }
                        })
                    }
                </div>
            </div>
        </li>
    )
};

export default MessageBubble;