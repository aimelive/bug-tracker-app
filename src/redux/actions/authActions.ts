import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../config/firebaseConfig";
import User from "../../models/user";
import * as actions from "../actionTypes";

export const signIn = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const auth = getAuth();
      const resp = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName, photoURL } = resp.user;
      const user: User = {
        uid,
        email,
        displayName,
        photoURL,
      } as User;

      const docUser = await getDoc(doc(firestore, "users", uid));

      if (!docUser.exists()) {
        throw new FirebaseError("User does not exist", "user not found");
      }

      user.displayName = docUser.data()?.displayName
        ? docUser.data()?.displayName
        : email.slice(0, email.indexOf("@"));

      window.localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: actions.USER_SIGNIN,
        payload: { user },
      });
    } catch (error: any) {
      dispatch({
        type: actions.SIGNIN_ERROR,
        payload: { error: error.code },
      });
    }
  };
};
export const signUp = (username: string, email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const auth = getAuth();
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      const { uid, photoURL } = resp.user;

      const user: User = {
        uid,
        email,
        displayName: username,
        photoURL,
      } as User;

      await setDoc(doc(firestore, "users", uid), user);

      window.localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: actions.USER_SIGNIN,
        payload: { user },
      });
    } catch (error: any) {
      dispatch({
        type: actions.SIGNIN_ERROR,
        payload: { error: error.code },
      });
    }
  };
};
export const signOut = () => {
  return async (dispatch: any) => {
    const auth = getAuth();
    await auth.signOut();
    window.localStorage.removeItem("user");
    dispatch({ type: actions.LOGOUT });
  };
};
