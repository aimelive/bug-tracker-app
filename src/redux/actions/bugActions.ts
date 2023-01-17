import * as actions from "../actionTypes";

export const bugAdded = (description: string) => ({
  type: actions.BUG_ADDED,
  payload: {
    description,
    date: new Date().toString()
  },
});

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