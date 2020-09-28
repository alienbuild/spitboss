import React, {useEffect, useState} from "react";
import { Redirect } from 'react-router'
import {getSpitboxRooms} from "../Spitbox/apiSpitbox";
import {Link} from "react-router-dom";
import CreateBoxes from "./CreateBoxes";

const GetBoxes = () => {

    // Init state
    const [spitboxes, setSpitboxes] = useState([]);
    const [redirectUser, setRedirectUser] = useState(false);
    const [spitboxId, setSpitboxId] = useState();
    const [createSpitbox, setCreateSpitbox] = useState(false);

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

    const handleCreateSpitbox = () => {
        setCreateSpitbox(!createSpitbox);
    }

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
            <button onClick={e => handleCreateSpitbox(e)}>Create Spitbox</button>
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
            {createSpitbox ? <CreateBoxes /> : null}
        </>
    )
}

export default GetBoxes;