import { all } from "redux-saga/effects";
import authSaga from "./auth";
import cartSaga from "./cart";

export default function* rootSaga() {
  yield all([authSaga(), cartSaga()]);
}
