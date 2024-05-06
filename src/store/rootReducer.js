import { combineReducers } from "redux";
import userReducer from "./user/Reducer";
import projectReducer from "./project/Reducer";
import taskReducer from "./task/Reducer";

const rootReducer = combineReducers({
    user : userReducer,
    project: projectReducer,
    task : taskReducer,
});

export default rootReducer;