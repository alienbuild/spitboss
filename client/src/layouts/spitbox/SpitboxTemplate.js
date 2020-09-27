import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GameAnnouncer from "../../Components/Spitbox/GameAnnouncer";

import { loadAnimation } from 'lottie-web';
import { defineLordIconElement } from 'lord-icon-element';
import SpitbossLogo from '../../assets/images/spitboss.svg';
import ModalRooms from "../../Components/Spitbox/ModalRooms";
import {getSpitboxRoom} from "../../Components/Spitbox/apiSpitbox";
import {saveSpitboxRoom} from "../../actions/spitboxActions";
import Battle from "../../Components/Spitbox/RoomTypes/Battle";
import PassThe40 from "../../Components/Spitbox/RoomTypes/PassThe40";
import PreLoader from "../../Components/Spitbox/PreLoader";

// register lottie and define custom element
defineLordIconElement(loadAnimation);

const SpitboxTemplate = ({children, socket, setMessages}) => {

    // Ready dispatch
    const dispatch = useDispatch();

    // Grab state from redux store
    const username = useSelector(state => state.user.user.user.name);

    // Init state
    const [watchers, setWatchers] = useState(0);
    const [showRoomsModal, setShowRoomsModal] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [spitbox, setSpitbox] = useState();

    useEffect(() => {
        // Get room by id
        getSpitboxRoom('5f53bb2415aed9537c2dfc42')
            .then(res => {

                // Save room data to redux
                dispatch(saveSpitboxRoom(res));

                // Save spitbox details
                setSpitbox(res);

                // Grab participants
                setParticipants(res.participants)

            })
            .catch(e => console.log('Error', e));
    },[]);

    useEffect(() => {
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
        <PreLoader />
        <div id="primary-grid">
            <div id="feed-container">
                <GameAnnouncer socket={socket} />
                {spitbox && spitbox.mode === 'battle' ? <Battle spitbox={spitbox} username={username} /> : <PassThe40 spitbox={spitbox} username={username} />}
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