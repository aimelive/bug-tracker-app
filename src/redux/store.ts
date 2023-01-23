import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk)
    // reduxFirestore(app)
    // reactReduxFirebase(app)
    // applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    // reduxFirestore(app)
    // // reactReduxFirebase(app)
  )
);

export default store;
