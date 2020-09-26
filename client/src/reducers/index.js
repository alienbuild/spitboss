import { combineReducers } from "redux";
import userReducer from "./userReducer";
import spitboxReducer from "./spitboxReducer";

export default combineReducers({
    user: userReducer,
    spitbox: spitboxReducer
});