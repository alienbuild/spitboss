import React, {useState} from "react";
import {useSelector} from "react-redux";

const OpponentAvControls = () => {

    const [muteMicrophone, setMuteMicrophone] = useState(true);
    const [showCamera, setShowCamera] = useState(false);
    const [ready, setReady] = useState(false);

    const toggleMicrophone = () => {
        setMuteMicrophone(!muteMicrophone);
    }

    const toggleCamera = () => {
        setShowCamera(!showCamera);
    }

    const toggleReady = () => {
        setReady(!ready);
    }

    return (
        <div className="opponent-av-controls">
            <button className="opponent-ready waiting">Waiting</button>
            <ul>
                <li>
                    <button id={`toggle-microphone`} onClick={toggleMicrophone}>
                        <lord-icon
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

export default OpponentAvControls;