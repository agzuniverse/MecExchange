import { createStore, combineReducers } from "redux";
import { testReducer, authReducer, searchReducer } from "./Reducers";

const reducer = combineReducers({
  test: testReducer,
  auth: authReducer,
  search: searchReducer
});

export default createStore(reducer);
