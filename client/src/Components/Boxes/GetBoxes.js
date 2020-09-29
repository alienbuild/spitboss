import React, {useEffect, useState} from "react";
import { Redirect } from 'react-router'
import {getSpitboxRooms} from "../Spitbox/apiSpitbox";
import {Link} from "react-router-dom";
import CreateBoxes from "./Create/CreateBoxes";

const GetBoxes = () => {

    // Init state
    const [spitboxes, setSpitboxes] = useState([]);
    const [redirectUser, setRedirectUser] = useState(false);
    const [spitboxId, setSpitboxId] = useState();

    useEffect(() => {

        // Grab the list of spitboxes
        getSpitboxRooms()
            .then(res => {
                setSpitboxes(res);
            })
            .catch(err => console.log('Error: ', err));

    },[]);

    const handleJoin = (boxId) => {
        console.log('Handling join.');
        setSpitboxId(boxId);
        setRedirectUser(true);
    };

    return (
        <>
            {redirectUser ? <Redirect
                to={{
                    pathname: `/spitbox/${spitboxId}`,
                    state: { referrer: 'something' }
                }}
            /> : null }
            <h1>Getting boxes.</h1>
            {/*<Link to={`/spitbox/boxes/create`}>Create Spitbox</Link>*/}
            <nav className={`box-list`}>
                <ul>
                    {spitboxes.map((box) => (
                        <li>
                            id: {box._id}
                            <br/>
                            name: {box.name}
                            <br/>
                            description: {box.description}
                            <br/>
                            participants: {box.participants}
                            <br/>
                            mode: {box.mode}
                            <br/>
                            <button onClick={e => handleJoin(box._id)}>Join</button>
                        </li>
                    ))}
                </ul>
            </nav>
            <CreateBoxes />
        </>
    )
}

export default GetBoxes;