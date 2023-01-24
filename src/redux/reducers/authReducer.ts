import User from "../../models/user";
import * as actions from "../actionTypes";

let user: User | null = null;

if (localStorage.getItem("user")) {
  const obj = JSON.parse(localStorage.getItem("user")!);
  user = {
    uid: obj.uid,
    email: obj.email,
    displayName: obj.displayName,
    photoURL: obj.photoURL,
  } as User;
}
const initState = {
  user: user,
  authError: null,
};

const authReducer = (state = initState, action: any) => {
  switch (action.type) {
    case actions.USER_SIGNIN:
      console.log("Sign in went successfully");
      return {
        ...state,
        user: action.payload.user,
        authError: null,
      };
    case actions.SIGNIN_ERROR:
      console.log("Signing in failed");
      return {
        ...state,
        authError: action.payload.error,
      };
    case actions.LOGOUT:
      return {
        user: null,
        authError: null,
      };
    default:
      return state;
  }
};

export default authReducer;
