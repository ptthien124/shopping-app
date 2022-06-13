import { Meteor } from "meteor/meteor";
import { call, fork, put, take, takeLatest } from "redux-saga/effects";
import { ACTIONS, CONSTANTS } from "../actions/auth";
import { navigate } from "../actions/router";
import { meteorCall } from "../utils";

function loginWithPassword({ email, password }) {
  return new Promise((resolve, reject) =>
    Meteor.loginWithPassword({ email }, password, (error) =>
      error ? reject(error) : resolve(Meteor.user())
    )
  );
}

function logoutUser() {
  return new Promise((resolve, reject) =>
    Meteor.logout((error) => (error ? reject(error) : resolve(Meteor.user())))
  );
}

function* login({ payload }) {
  try {
    const userData = yield call(loginWithPassword, payload);

    if (!userData) throw new Error(`user data's not found`);

    yield put(ACTIONS.LOGIN.SUCCESS(userData));

    yield put(navigate("/"));
  } catch (error) {
    yield put(ACTIONS.LOGIN.FAIL({ error: error.reason }));
  }
}

function* logout() {
  try {
    yield call(logoutUser);

    yield put(ACTIONS.LOGOUT.SUCCESS());

    yield put(navigate("/login"));
  } catch (error) {
    yield put(ACTIONS.LOGOUT.FAIL({ error: error.reason }));
  }
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = localStorage.getItem("Meteor.loginToken");

    if (!isLoggedIn) {
      const { payload } = yield take(CONSTANTS.LOGIN.REQUEST);
      yield call(login, { payload });
    }

    yield take(CONSTANTS.LOGOUT.REQUEST);
    yield call(logout);
  }
}

function* signUp({ payload }) {
  try {
    yield call(meteorCall, "user.signUp", payload);

    yield put(ACTIONS.SIGN_UP.SUCCESS());

    const loginData = { email: payload.email, password: payload.password };

    yield put(ACTIONS.LOGIN.REQUEST(loginData));
  } catch (error) {
    yield put(ACTIONS.SIGN_UP.FAIL({ error: error.reason }));
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
  yield takeLatest(CONSTANTS.SIGN_UP.REQUEST, signUp);
}
