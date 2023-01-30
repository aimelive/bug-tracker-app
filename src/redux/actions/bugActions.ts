import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../config/firebaseConfig";
import Bug from "../../models/bug";
import * as actions from "../actionTypes";

export const getAllBugs = (uid: string) => {
  return async (dispatch: any) => {
    try {
      const bugs: Bug[] = [];
      const q = query(
        collection(firestore, "bugs"),
        where("creatorId", "==", uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const {
          title,
          description,
          resolved,
          creatorId,
          createdAt,
          resolvedAt,
          status,
        } = doc.data();
        bugs.push({
          id: doc.id,
          title,
          description,
          resolved,
          creatorId,
          createdAt: createdAt.toDate(),
          resolvedAt: resolvedAt.toDate(),
          status,
        } as Bug);
      });
      bugs.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      });
      dispatch({
        type: actions.GET_ALL_BUGS,
        payload: {
          bugs,
        },
      });
    } catch (error) {
      console.log("SOMETHING WENT WRONG ", error);
    }
  };
};

export const bugAdded = (title: string, uid: string) => {
  return async (dispatch: any) => {
    try {
      const bug = {
        title,
        description: "No description provided yet",
        resolved: false,
        creatorId: uid,
        status: "created",
        createdAt: new Date(),
        resolvedAt: new Date(),
      };

      const response = await addDoc(collection(firestore, "bugs"), bug);

      dispatch({
        type: actions.BUG_ADDED,
        payload: {
          ...bug,
          id: response.id,
          createdAt: bug.createdAt.toString(),
          resolvedAt: bug.resolvedAt.toString(),
        },
      });
    } catch (error) {
      console.log(
        "SOMETHING WENT WRONG WHILE ADDDING NEW BUG TO OUR DATABASE",
        error
      );
      dispatch({
        type: actions.CREATE_BUG_ERROR,
        payload: { title, error },
      });
    }
  };
};

export const bugRemoved = (id: string) => {
  return async (dispatch: any) => {
    try {
      const collRef = doc(firestore, "bugs", id);
      await updateDoc(collRef, { status: "deleted" });
      dispatch({
        type: actions.BUG_REMOVED_TEMP,
        payload: {
          id,
        },
      });
    } catch (error) {
      dispatch({
        type: actions.DELETE_BUG_ERROR,
        payload: { id, error },
      });
    }
  };
};
export const bugRestored = (id: string) => {
  return async (dispatch: any) => {
    try {
      const collRef = doc(firestore, "bugs", id);
      await updateDoc(collRef, { status: "created" });
      dispatch({
        type: actions.BUG_RESTORED,
        payload: {
          id,
        },
      });
    } catch (error) {
      // dispatch({
      //   type: actions.DELETE_BUG_ERROR,
      //   payload: { id, error },
      // });
    }
  };
};
export const bugRemovedForever = (id: string) => {
  return async (dispatch: any) => {
    try {
      const collRef = doc(firestore, "bugs", id);
      await deleteDoc(collRef);
      dispatch({
        type: actions.BUG_REMOVED,
        payload: {
          id,
        },
      });
    } catch (error) {
      dispatch({
        type: actions.DELETE_BUG_ERROR,
        payload: { id, error },
      });
    }
  };
};

export const bugResolved = (id: string) => {
  return async (dispatch: any) => {
    try {
      const collRef = doc(firestore, "bugs", id);
      await updateDoc(collRef, { resolved: true, resolvedAt: new Date() });
      dispatch({
        type: actions.BUG_RESOLVED,
        payload: {
          id,
        },
      });
    } catch (error) {
      console.log("SOMETHING WENT WRONG WHILE RESOLVING ERROR", error);
      dispatch({
        type: actions.RESOLVE_BUG_ERROR,
        payload: { id, error },
      });
    }
  };
};
