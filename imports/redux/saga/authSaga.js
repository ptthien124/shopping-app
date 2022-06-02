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
    const indexOfAtSign = payload.payload.username.indexOf("@");
    const username =
      payload.payload.username.slice(0, indexOfAtSign) +
      payload.payload.username.slice(indexOfAtSign + 1);

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

    yield call("auth._checkPassword", {
      username,
      password: payload.payload.password,
    })
      .then((result) => (isUserExisted = result))
      .catch((error) => (isUserExisted = error));

    const auth = {
      username: isUserExisted.username,
      fullName: isUserExisted.profile.fullName,
      userId: isUserExisted._id,
    };

    if (isUserExisted.check) {
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
