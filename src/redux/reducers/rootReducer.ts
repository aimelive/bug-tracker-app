import { combineReducers } from "redux";
import authReducer from "./authReducer";
import bugReducer from "./bugReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  bugs: bugReducer,
  notification: notificationReducer,
});

export default rootReducer;
