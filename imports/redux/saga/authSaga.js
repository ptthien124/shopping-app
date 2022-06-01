import { Meteor } from "meteor/meteor";
import { call, fork, put, take, select, takeEvery } from "redux-saga/effects";
import {
  loginFailed,
  loginSuccess,
  LOGIN_REQUEST,
  logoutAuth,
  LOGOUT_REQUEST,
} from "../actions/authAction";

function* login(payload) {
  try {
    const indexOfAtSign = payload.payload.email.indexOf("@");
    const email =
      payload.payload.email.slice(0, indexOfAtSign) +
      payload.payload.email.slice(indexOfAtSign + 1);

    let isUserExisted = null;

    const call = (methodName, args = {}) =>
      new Promise((resolve, reject) => {
        Meteor.call(methodName, { ...args }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });

    yield call("users._checkPassword", {
      username: email,
      password: payload.payload.password,
    })
      .then((result) => (isUserExisted = result))
      .catch((error) => (isUserExisted = error));

    const auth = {
      email: isUserExisted.user.username,
      fullName: isUserExisted.user.profile.fullName,
      userId: isUserExisted.userId,
    };

    if (!isUserExisted.error) {
      yield put(loginSuccess(auth));
    } else {
      yield put(loginFailed(isUserExisted?.error));
    }
  } catch (err) {
    yield put(loginFailed(err));
  }
}

function* logout() {
  yield put(logoutAuth());
}

function* watchLogin() {
  yield takeEvery(LOGIN_REQUEST, login);
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

export default function* authSaga() {
  yield fork(watchLogin);
  yield fork(watchLogout);
}
