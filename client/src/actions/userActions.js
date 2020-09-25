import {LOGIN_REQUEST, USER_LOGOUT, SAVE_TOKEN} from "./types";

export const getUser = (data) => {
    return {
        type: LOGIN_REQUEST,
        payload: data
    }
};

export const signOutUser = () => {
    return {
        type: USER_LOGOUT
    }
};

export const saveSocketToken = (data) => {
    return {
        type: SAVE_TOKEN,
        payload: data
    }
}