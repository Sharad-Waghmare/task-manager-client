import { combineReducers } from "redux"
import userReducer from "./loginContext/Reducer";


const rootReducer = combineReducers({
    auth:userReducer,
})

export default rootReducer;