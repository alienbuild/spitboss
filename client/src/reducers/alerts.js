import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            if(alert.id){
                return state.filter(alert => alert.id !== payload);
            } else{
                return initialState;
            }
        default:
            return state;
    }
}