import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../config/firebaseConfig";
import Notification from "../../models/notification";
import * as actions from "../actionTypes";

export const getAllNotifications = (userId: string) => {
  return async (dispatch: any) => {
    try {
      const notifications: Notification[] = [];

      const q = query(
        collection(firestore, "notifications"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const { content, userId, time } = doc.data();

        notifications.push({
          id: doc.id,
          content,
          userId,
          time: time.toDate(),
        } as Notification);
      });

      notifications.sort((a, b) => {
        if (a.time > b.time) return -1;
        if (a.time < b.time) return 1;
        return 0;
      });

      dispatch({ type: actions.GET_NOTIFICATIONS, payload: { notifications } });
    } catch (error: any) {
      dispatch({
        type: actions.GET_NOTIFICATIONS_ERROR,
        payload: { error: error.code },
      });
    }
  };
};
