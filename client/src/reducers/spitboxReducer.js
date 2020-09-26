import { SAVE_SPITBOX } from "../actions/types";

const initialState = { loading: true, spitbox: null };

export default (state = initialState, action) => {
    console.log('Spitbox reducer. Payload is: ', action.payload)
    switch (action.type) {
        case SAVE_SPITBOX:
            return {
                ...state,
                loading: false,
                spitbox: action.payload
            };
        default:
            return state;
    }
}