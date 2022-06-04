import { Meteor } from "meteor/meteor";
import { fork, put, takeEvery } from "redux-saga/effects";
import {
  loginFailed,
  loginSuccess,
  LOGIN_REQUEST,
  logoutAuth,
  LOGOUT_REQUEST,
} from "../actions/authAction";

function* login(payload) {
  try {
    const username = payload.payload.username.replace("@", "AtSign");

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

    const customLogin = (user, password) =>
      new Promise((resolve, reject) => {
        Meteor.loginWithPassword(user, password, (error) => {
          if (error) {
            reject({ isSuccess: false, error });
          } else {
            resolve({ isSuccess: true });
          }
        });
      });

    let status = null;

    yield customLogin((user = username), (password = payload.payload.password))
      .then((result) => (status = result))
      .catch((error) => (status = error));

    if (status.isSuccess) {
      let user = {};

      yield call("auth.findUser", { username })
        .then((result) => (user = result))
        .catch((error) => (user = error));

      if (user._id) {
        const data = {
          username: user.username,
          fullName: user.profile.fullName,
          userId: user._id,
          isAdmin: user.profile.isAdmin,
        };
        yield put(loginSuccess(data));
      } else {
        yield put(loginFailed("Can't find user"));
      }
    } else {
      yield put(loginFailed(status.error));
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
