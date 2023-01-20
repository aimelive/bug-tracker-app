import { combineReducers } from "redux";
import authReducer from "./authReducer";
import bugReducer from "./bugReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  bugs: bugReducer,
});

export default rootReducer;
