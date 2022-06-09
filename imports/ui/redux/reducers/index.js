// import cartReducer from "./cart";
import authReducer from "./auth";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  // cart: cartReducer,
  auth: authReducer
});
export default rootReducer;
