import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
// import { history } from "../store";
import authReducer from "./auth";
import cartReducer from "./cart";

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducer;
