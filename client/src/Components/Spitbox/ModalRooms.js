import React, {useEffect, useState} from "react";
import {getSpitboxRooms} from "./apiSpitbox";

const ModalRooms = ({showModal, setShowRoomsModal}) => {

    // init state
    const [value, setValue] = useState('default');
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(false);

    // Get Spitbox rooms
    const getRooms = () => {
        getSpitboxRooms()
            .then(rooms => {
                if(rooms.error){
                    setError(true);
                } else {
                    setRooms(rooms);
                }
            })
            .catch(e => console.log('Error getting rooms: ', e))
    };

    useEffect(() => {
        setValue(showModal) }, [showModal]
    );

    useEffect(() => {
        getRooms();
    },[]);


    return(
        <div class={`modal active`}>
            <div className="container">
                <section>
                    <header>
                        <h1>Rooms:</h1>
                        <button onClick={e => setShowRoomsModal(false)}>X</button>
                    </header>
                    <ul>
                        {rooms.map((room) => (
                            <li>
                                <span className="room-name">{room.name}</span>
                                <span className="room-mode">{room.mode}</span>
                                <span className="room-desc">{room.description}</span>
                                <span className="room-progress">{room.progress}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
};

export default ModalRooms;