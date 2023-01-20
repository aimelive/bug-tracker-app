import * as actions from "../actionTypes";

export const bugAdded = (description: string) => {
  return (dispatch: any, getState: any) => {
    //make async call to database
    dispatch({
      type: actions.BUG_ADDED,
      payload: {
        description,
        date: new Date().toString(),
      },
    });
  };
};

export const bugRemoved = (id: number) => ({
  type: actions.BUG_REMOVED,
  payload: {
    id,
  },
});

export const bugResolved = (id: number) => ({
  type: actions.BUG_RESOLVED,
  payload: {
    id,
  },
});
