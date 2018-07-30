import { combineReducers } from "redux";
import authReducer from "./auth";
import errorReducer from "./error";
import profileReducer from "./profile";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  error: errorReducer
});

export default rootReducer;
