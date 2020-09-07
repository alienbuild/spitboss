import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {getSpitboxRooms} from "./apiSpitbox";

const ModalRooms = ({showModal, setShowRoomsModal, socket, setMessages}) => {

    // init state
    const [value, setValue] = useState('default');
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(false);

    // Grab state from redux store
    const username = useSelector(state => state.user.user.user.name);
    console.log('Redux data is: ', username);

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

    // Handle room swap
    const handleJoin = (e, room) => {
      e.preventDefault();
        socket.current.emit('join', {
            user: username,
            room: room
        });
        setMessages([]);

    };

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
                                <button onClick={(e) => handleJoin(e, room.name)}>Join</button>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
};

export default ModalRooms;