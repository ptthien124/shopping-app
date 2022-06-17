import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
// import { history } from "../store";
import authReducer from "./auth";
import cartReducer from "./cart";
import productReducer from "./product";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  });

export default rootReducer;
