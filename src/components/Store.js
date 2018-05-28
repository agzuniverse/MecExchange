import { createStore } from "redux";

const reducer = (state, action) => {
  if (action.type === "TEST") {
    return Object.assign({}, state, { test: action.payload.test });
  } else if (action.type === "SET_UID") {
    return Object.assign({}, state, { uid: action.payload.uid });
  } else if (action.type === "SET_NAME") {
    return Object.assign({}, state, { name: action.payload.name });
  } else if (action.type === "SET_EMAIL") {
    return Object.assign({}, state, { email: action.payload.email });
  } else if (action.type === "SET_PROPIC") {
    return Object.assign({}, state, { proPic: action.payload.propic });
  } else if (action.type === "SEARCH_STRING") {
    return Object.assign({}, state, { query: action.payload.query });
  } else if (action.type === "SEMFILTER") {
    return Object.assign({}, state, { semFilter: action.payload.sem });
  } else if (action.type === "BRANCHFILTER") {
    return Object.assign({}, state, { branchFilter: action.payload.branch });
  }
  return state;
};

export default createStore(reducer, {
  test: "incomplete",
  uid: "",
  name: "",
  proPic: "",
  email: "",
  query: "",
  semFilter: "Any semester",
  branchFilter: "Any branch"
});
