import React from "react";
import UserAvControls from "../UserAvControls";
import {useSelector} from "react-redux";

const Battle = ({ spitbox, username }) => {

    // Grab state from redux store
    const userId = useSelector(state => state.user.user.user._id);
    const participants = useSelector(state => state.spitbox.spitbox.participants);

    return (
        <>
            <div className="feed participant-1">
                <div className="participant">
                    <div className="avatar"></div>
                    <button>{username}</button>
                </div>
                {participants.includes(userId) ? <UserAvControls /> : null}
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
        </>
    )
};

export default Battle;