import { combineReducers } from "redux";
import userInfo from "./userInfo";

const allReducers = combineReducers({
  userInfo,
});

export default allReducers;
