import { Meteor } from "meteor/meteor";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  CONSTANTS,
  ACTIONS,
} from "../actions/auth";
import { meteorCall } from "../utils";

function loginWithPassword({email, password}) {
  return new Promise((resolve, reject) => Meteor.loginWithPassword({ email }, password, (error) => error ? reject(error) : resolve(Meteor.user())));
}

function* login({ payload }) {
  try {
    const userData = yield call(loginWithPassword, payload);

    console.log('userData: ', userData);

    if (!userData) throw new Error(`user data's not found`);

    yield put(ACTIONS.LOGIN.SUCCESS(userData));
  } catch (error) {
    yield put(ACTIONS.LOGIN.FAIL({ error: error.reason }));
  }
}

function* signUp({payload}) {
  try {
    yield call(meteorCall, 'user.signUp', payload);

    yield put(ACTIONS.SIGN_UP.SUCCESS());
  } catch (error) {
    yield put(ACTIONS.SIGN_UP.FAIL({ error: error.reason }));
  }
}

export default function* authSaga() {
  yield takeLatest(CONSTANTS.LOGIN.REQUEST, login);
  yield takeLatest(CONSTANTS.SIGN_UP.REQUEST, signUp);
}
