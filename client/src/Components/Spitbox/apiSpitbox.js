import {API} from '../../config';

// Get Spitbox rooms
export const getSpitboxRooms = () => {
    return fetch(`${API}/spitbox/list`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log('Error', err))
};
