import postsSlice from "../slices/postsSlice";
import global from "../slices/global";
import { combineReducers } from 'redux'
const rootReducer = {
    postsSlice,
    global
}

export default combineReducers(rootReducer);