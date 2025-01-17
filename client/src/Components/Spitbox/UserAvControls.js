import React, {useState} from "react";
import {useSelector} from "react-redux";

const UserAvControls = ({toggleUserReady}) => {

    const [muteMicrophone, setMuteMicrophone] = useState(true);
    const [showCamera, setShowCamera] = useState(false);
    const [ready, setReady] = useState(false);

    const toggleMicrophone = (e) => {
        e.preventDefault();
        //e.target.setAttribute('palette', '#FECB47;#e5251f');
        setMuteMicrophone(!muteMicrophone);
    }

    const toggleCamera = () => {
        setShowCamera(!showCamera);
    }

    const toggleReady = () => {
        setReady(!ready);
        toggleUserReady();
    }

    return (
        <div className={`user-av-controls`}>
            <button onClick={e => toggleReady()} className={`ready-button ${ready ? 'user-not-ready' : 'user-ready'}`}>{ready ? 'Cancel' : 'Ready'}</button>
            <ul>
                <li>
                    <button id={`toggle-microphone`} onClick={e => toggleMicrophone(e)}>
                        <lord-icon
                            reverse={true}
                            target="button"
                            animation="click"
                            palette="#CCCCCC;#CCCCCC"
                            src={`../../assets/icons/190-microphone-stop-recording-button-morph-outline/190-microphone-stop-recording-button-morph-outline.json`}>
                        </lord-icon>
                    </button>
                </li>
                <li>
                    <button id={`toggle-camera`} onClick={toggleCamera}>
                        <lord-icon
                            target="button"
                            animation="click"
                            palette="#CCCCCC;#CCCCCC"
                            src={`../../assets/icons/22-play-pause-morph-outline/22-play-pause-morph-outline.json`}>
                        </lord-icon>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default UserAvControls;