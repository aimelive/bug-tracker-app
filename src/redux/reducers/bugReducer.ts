import * as actions from "../actionTypes";

let lastId = 0;

const initState: Object = [
  // { id: ++lastId, description: "bug one", resolved: true },
];

export default function bugReducer(state: any = initState, action: any) {
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        {
          id: ++lastId,
          description: action.payload.description,
          date: action.payload.date,
          resolved: false,
        },
        ...state,
      ];
    case actions.BUG_REMOVED:
      return state.filter((bug: any) => bug.id !== action.payload.id);
    case actions.BUG_RESOLVED:
      return state.map((bug: any) =>
        bug.id !== action.payload.id
          ? bug
          : {
              ...bug,
              resolved: true,
            }
      );
    default:
      return state;
  }
}
