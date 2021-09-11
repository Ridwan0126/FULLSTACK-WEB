import { combineReducers } from "redux";
import AuthReducer from "./auth";
import customerList from "./CutomerList.js";

export default combineReducers({
  Auth: AuthReducer,
  Customer: customerList,
});
