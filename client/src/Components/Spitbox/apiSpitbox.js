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

// Get Spitbox room by id
export const getSpitboxRoom = (spitboxId) => {
    return fetch(`${API}/spitbox/read/${spitboxId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log('Error', err))
};

// Create Spitbox
export const createSpitbox = () => {
  return fetch(`${API}/spitbox/create`, {
      method: "POST"
  })
      .then(response => {
          return response.json()
      })
      .catch(err => console.log('Error creating spitbox. ', err))
};