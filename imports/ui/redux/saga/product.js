import { put, takeLatest } from "redux-saga/effects";
import { ACTIONS, CONSTANTS } from "../actions/product";
import { Meteor } from "meteor/meteor";
import { meteorCall } from "../utils";

function* add({ payload }) {
  try {
    yield meteorCall("products.insert", {
      ...payload,
    });

    yield put(ACTIONS.ADD.SUCCESS());
  } catch (error) {
    yield put(ACTIONS.ADD.FAIL({ error: error.reason }));
  }
}

function* update({ payload }) {
  try {
    yield meteorCall("products.update", {
      ...payload,
    });

    yield put(ACTIONS.UPDATE.SUCCESS());
  } catch (error) {
    yield put(ACTIONS.UPDATE.FAIL({ error: error.reason }));
  }
}

function* remove({ payload }) {
  try {
    yield meteorCall("products.remove", { ...payload });

    yield put(ACTIONS.REMOVE.SUCCESS());
  } catch (error) {
    yield put(ACTIONS.REMOVE.FAIL({ error: error.reason }));
  }
}

export default function* productSaga() {
  yield takeLatest(CONSTANTS.ADD.REQUEST, add);
  yield takeLatest(CONSTANTS.UPDATE.REQUEST, update);
  yield takeLatest(CONSTANTS.REMOVE.REQUEST, remove);
}
