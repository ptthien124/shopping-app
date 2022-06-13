import { combineReducers } from "redux";
import authReducer from "./auth";
import cartReducer from "./cart";
import routerReducer from "./router";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  router: routerReducer,
});

export default rootReducer;
