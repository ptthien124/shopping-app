import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import userReducer from './userReducer'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  user: userReducer
});
export default rootReducer;
