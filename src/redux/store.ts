import { createStore } from "redux";
import bugReducer from "./reducers/bugReducer";

const store = createStore(bugReducer);

export default store;