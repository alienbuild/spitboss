import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GameAnnouncer from "../../Components/Spitbox/GameAnnouncer";

import { loadAnimation } from 'lottie-web';
import { defineLordIconElement } from 'lord-icon-element';
import SpitbossLogo from '../../assets/images/spitboss.svg';
import ModalRooms from "../../Components/Spitbox/ModalRooms";
import {getSpitboxRoom} from "../../Components/Spitbox/apiSpitbox";
import {saveSpitboxRoom} from "../../actions/spitboxActions";

// register lottie and define custom element
defineLordIconElement(loadAnimation);

const SpitboxTemplate = ({children, socket, setMessages}) => {

    // Ready dispatch
    const dispatch = useDispatch();

    // Grab state from redux store
    const username = useSelector(state => state.user.user.user.name);
    const userId = useSelector(state => state.user.user.user._id);

    // Init state
    const [watchers, setWatchers] = useState(0);
    const [showRoomsModal, setShowRoomsModal] = useState(false);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        // Get room by id
        getSpitboxRoom('5f53bb2415aed9537c2dfc42')
            .then(res => {

                console.log('Get spitbox room: ', res);
                // Save room data to redux
                dispatch(saveSpitboxRoom(res));

                // Grab participants
                setParticipants(res.participants)

            })
            .catch(e => console.log('Error', e));

        // Get users video and send it to video container
        streamCamVideo();
    },[socket]);

    const streamCamVideo = () => {
        const constraints = { audio: true, video: { width: 1280, height: 720 } };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function(mediaStream) {
                const video = document.querySelector("video");
                video.srcObject = mediaStream;

                // mediaStream.getTracks().forEach(function(track) {
                //     if (track.readyState == 'live' && track.kind === 'video') {
                //         track.stop();
                //     }
                // });
                //https://stackoverflow.com/questions/11642926/stop-close-webcam-which-is-opened-by-navigator-getusermedia
            })
            .catch(function(err) {
                console.log(err.name + ": " + err.message);
            }); // always check for errors at the end.
    };

    if (socket.current){
        socket.current.on('updateUserList', (users) => {
            setWatchers(users.length);
        })
    }

    return(
        <>
            {participants.includes(userId) ? <button>READY</button> : null}
        <div id="primary-grid">
            <div id="feed-container">
                <GameAnnouncer socket={socket}/>
                <div className="feed participant-1">
                    <div className="participant">
                        <div className="avatar"></div>
                        <button>{username}</button>
                    </div>
                    <video
                        id="videoElement"
                        muted
                        controls={false}
                        autoPlay
                        poster="https://is1-ssl.mzstatic.com/image/thumb/Music/v4/cb/4f/41/cb4f41f2-6d6e-540f-2119-fdf58ad19499/source/1200x1200bb.jpg"
                    ></video>
                </div>
                <div className="feed participant-2">
                    <div className="participant">
                        <div className="avatar"></div>
                        <button>{username}</button>
                    </div>
                    <video
                        id="videoElement2"
                        muted
                        controls={false}
                        autoPlay
                        poster="https://christopherpierznik.files.wordpress.com/2017/02/canibus_at_amager_bio_4.jpg"
                    ></video>
                </div>
            </div>

            <div id="aside-grid">
                <header>
                    <img src={SpitbossLogo} id={`logo`}/>
                    <h1>#canibusvsdizaster</h1>
                    <ul>
                        <li>
                            <lord-icon
                                animation="loop"
                                palette="#8c8895;#8c8895"
                                src={`../../assets/icons/69-eye/69-eye-solid.json`}>
                            </lord-icon>
                            {watchers}</li>
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
                                <li>
                                    <button onClick={e => setShowRoomsModal(!showRoomsModal)}>
                                        <lord-icon
                                            animation="loop"
                                            palette="#ffffff;#fecb47"
                                            target="button"
                                            size={'10px'}
                                            src={`../../assets/icons/27-globe/27-globe-outline.json`}>
                                        </lord-icon>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                </div>
            </div>

        </div>

            { showRoomsModal ? <ModalRooms setShowRoomsModal={setShowRoomsModal} socket={socket} setMessages={setMessages} /> : null}

    </>
    )
};

export default SpitboxTemplate;