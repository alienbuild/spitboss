import React, { useState } from 'react';
import SocketContext from '../../context/socketContext';

const UserList = ({socket}) => {
    // Init state
    const [users, setUsers] = useState([]);

    socket.on('updateUserList', (users) => {
        console.log('Users list: ', users);
        setUsers(users);
    });

    return(
        <aside>
            <h3>Users</h3>
            <ul>
                { users.map((user) => {
                    return <li key={user.id} id={user.id}>{user.name}</li>;
                }) }
            </ul>
        </aside>
    )
}

export default UserList;