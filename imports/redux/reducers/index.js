import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});
export default rootReducer;
