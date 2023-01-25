import Bug from "../../models/bug";
import * as actions from "../actionTypes";

const initState: any[] = [];

export default function bugReducer(state: any = initState, action: any) {
  switch (action.type) {
    case actions.GET_ALL_BUGS:
      return action.payload.bugs;
    case actions.BUG_ADDED:
      return [...state];
    case actions.BUG_REMOVED_TEMP:
      return state.map((bug: Bug) =>
        bug.id !== action.payload.id
          ? bug
          : {
              ...bug,
              status: "deleted",
            }
      );
    case actions.BUG_RESTORED:
      return state.map((bug: Bug) =>
        bug.id !== action.payload.id
          ? bug
          : {
              ...bug,
              status: "created",
            }
      );
    case actions.BUG_REMOVED:
      return state.filter((bug: Bug) => bug.id !== action.payload.id);
    case actions.BUG_RESOLVED:
      return state.map((bug: Bug) =>
        bug.id !== action.payload.id
          ? bug
          : {
              ...bug,
              resolved: true,
              resolvedAt: new Date().toString(),
            }
      );
    default:
      return state;
  }
}
