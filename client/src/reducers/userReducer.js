import {LOGIN_REQUEST, SAVE_TOKEN, USER_LOGOUT} from "../actions/types";

let user = JSON.parse(localStorage.getItem('jwt'));
const initialState = user ? { loggedIn: true, user } : {};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                user: action.payload
            };
        case USER_LOGOUT:
            return {};
        case SAVE_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
}