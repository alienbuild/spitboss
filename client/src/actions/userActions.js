import {LOGIN_REQUEST, USER_LOGOUT} from "./types";

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