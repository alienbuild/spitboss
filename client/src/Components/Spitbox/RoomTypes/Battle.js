import React, {useState} from "react";
import UserAvControls from "../UserAvControls";
import {useSelector} from "react-redux";
import OpponentAvControls from "../OpponentAvControls";

const Battle = ({ spitbox, username }) => {

    // Grab state from redux store
    const userId = useSelector(state => state.user.user.user._id);
    const participants = useSelector(state => state.spitbox.spitbox.participants);

    const [userReady, setUserReady] = useState(false);

    const toggleUserReady = () => {
      setUserReady(!userReady);
    };

    return (
        <>
            <div className="feed participant-1">
                <div className={`participant-overlay ${userReady ? 'active' : null}`}></div>
                <div className={`participant-border ${userReady ? 'active' : null}`}></div>
                <div className="participant">
                    <div className="avatar"></div>
                    <button>{username}</button>
                </div>
                {participants.includes(userId) ? <UserAvControls toggleUserReady={toggleUserReady} /> : null}
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
            <OpponentAvControls />
            <video
                id="videoElement2"
                muted
                controls={false}
                autoPlay
                poster="https://christopherpierznik.files.wordpress.com/2017/02/canibus_at_amager_bio_4.jpg"
            ></video>
        </div>
        </>
    )
};

export default Battle;