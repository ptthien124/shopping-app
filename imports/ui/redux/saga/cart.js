import { Meteor } from "meteor/meteor";
import { put, takeEvery } from "redux-saga/effects";
import { ACTIONS, CONSTANTS } from "../actions/cart";

function* add({ payload }) {
  try {
    const userData = Meteor.user();

    if (!userData) throw new Error(`Not logged in yet`);

    yield put(ACTIONS.ADD_TO_CART.SUCCESS(payload));
  } catch (error) {
    yield put(ACTIONS.ADD_TO_CART.FAIL({ error: error.reason }));
  }
}

function* remove({ payload }) {
  try {
    const userData = Meteor.user();

    if (!userData) throw new Error(`Not logged in yet`);

    yield put(ACTIONS.REMOVE_FROM_CART.SUCCESS(payload));
  } catch (error) {
    yield put(ACTIONS.REMOVE_FROM_CART.FAIL({ error: error.reason }));
  }
}

export default function* cartSaga() {
  yield takeEvery(CONSTANTS.ADD_TO_CART.REQUEST, add);
  yield takeEvery(CONSTANTS.REMOVE_FROM_CART.REQUEST, remove);
}
