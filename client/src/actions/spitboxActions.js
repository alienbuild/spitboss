import {SAVE_SPITBOX} from "./types";

export const saveSpitboxRoom = (data) => dispatch => {
    console.log('Saving Spitbox Room.', data._id);
    return dispatch({
        type: SAVE_SPITBOX,
        payload: data
    })
}