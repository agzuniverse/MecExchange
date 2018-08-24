import {
  TEST,
  SET_UID,
  SET_NAME,
  SET_EMAIL,
  SET_PROPIC,
  SEARCH_STRING,
  SEMFILTER,
  BRANCHFILTER
} from "./Actions";
import InitialState from "./InitialState";

export const testReducer = (state = InitialState.test, action) => {
  switch (action.type) {
    case TEST:
      return Object.assign({}, state, { testString: action.test });
    default:
      return state;
  }
};

export const authReducer = (state = InitialState.auth, action) => {
  switch (action.type) {
    case SET_UID:
      return Object.assign({}, state, { uid: action.uid });
    case SET_NAME:
      return Object.assign({}, state, { name: action.name });
    case SET_EMAIL:
      return Object.assign({}, state, { email: action.email });
    case SET_PROPIC:
      return Object.assign({}, state, { proPic: action.propic });
    default:
      return state;
  }
};

export const searchReducer = (state = InitialState.search, action) => {
  switch (action.type) {
    case SEARCH_STRING:
      return Object.assign({}, state, { query: action.query });
    case SEMFILTER:
      return Object.assign({}, state, { semFilter: action.sem });
    case BRANCHFILTER:
      return Object.assign({}, state, { branchFilter: action.branch });
    default:
      return state;
  }
};
