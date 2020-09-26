import React, {useState} from "react";

const UserAvControls = () => {

    const [muteMicrophone, setMuteMicrophone] = useState(true);
    const [showCamera, setShowCamera] = useState(false);

    const toggleMicorphone = () => {
        setMuteMicrophone(!muteMicrophone);
    }

    const toggleCamera = () => {
        setShowCamera(!showCamera);
    }

    return (
        <ul className={`user-av-controls`}>
            <li>
                <button id={`toggle-microphone`} onClick={toggleMicorphone}>
                    <lord-icon
                        target="button"
                        animation="click"
                        palette="#FECB47;#FECB47"
                        src={`../../assets/icons/190-microphone-stop-recording-button-morph-outline/190-microphone-stop-recording-button-morph-outline.json`}>
                    </lord-icon>
                </button>
            </li>
            <li>
                <button id={`toggle-camera`} onClick={toggleCamera}>
                    <lord-icon
                        target="button"
                        animation="click"
                        palette="#FECB47;#FECB47"
                        src={`../../assets/icons/22-play-pause-morph-outline/22-play-pause-morph-outline.json`}>
                    </lord-icon>
                </button>
            </li>

        </ul>
    )
}

export default UserAvControls;