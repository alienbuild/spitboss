import React from 'react';
import SpitbossLogo from '../../assets/images/spitboss.svg';

import { loadAnimation } from 'lottie-web';
import { defineLordIconElement } from 'lord-icon-element';

// register lottie and define custom element
defineLordIconElement(loadAnimation);

const SpitboxTemplate = ({children}) => (
    <>
        <div id="primary-grid">
            <div id="feed-container">
                <div className="mk-test">Round 1</div>
                <div className="grid-item grid-item-1">WebRTC #1</div>
                <div className="grid-item grid-item-2">WebRTC #2</div>
            </div>

            <div id="aside-grid">
                <header>
                    <img src={SpitbossLogo} id={`logo`} />
                    <h1>#canibusvsdizaster</h1>
                    <ul>
                        <li>145</li>
                        <li>Mode <strong>Pass the 40</strong></li>
                    </ul>
                </header>
                <div id="aside-nav-grid">
                    <div id="chat-messages">
                        {children}
                    </div>
                    <aside>
                        <nav>
                            <ul>
                                <li>
                                    <a href={`#`}>
                                        <lord-icon
                                            animation="loop"
                                            palette="#ffffff;#fecb47"
                                            target="a"
                                            size={'10px'}
                                            src={`../../assets/icons/203-chat-message/203-chat-message-outline.json`}>
                                        </lord-icon>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                </div>
            </div>

        </div>
    </>
);

export default SpitboxTemplate;