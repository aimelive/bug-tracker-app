import { IsLoading } from "../../helpers/shared";
import Notification from "../../models/notification";
import * as actions from "../actionTypes";

const initState: { status: IsLoading; notifications: Notification[] } = {
  status: IsLoading.loading,
  notifications: [],
};

const notificationReducer = (
  state = initState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case actions.GET_NOTIFICATIONS:
      return {
        status: IsLoading.done,
        notifications: action.payload.notifications,
      };
    case actions.GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        status: IsLoading.failed,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default notificationReducer;
