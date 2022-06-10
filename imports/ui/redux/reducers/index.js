// import cartReducer from "./cart";
import { combineReducers } from "redux";
import authReducer from "./auth";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer
});
export default rootReducer;
