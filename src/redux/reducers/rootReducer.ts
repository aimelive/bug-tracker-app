// import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import bugReducer from "./bugReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  bugs: bugReducer,
  // firebase: firebaseReducer,
});

export default rootReducer;
