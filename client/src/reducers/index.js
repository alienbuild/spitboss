import { combineReducers } from "redux";
import userReducer from "./userReducer";
import spitboxReducer from "./spitboxReducer";
import alerts from "./alerts";

export default combineReducers({
    user: userReducer,
    alerts,
    spitbox: spitboxReducer
});