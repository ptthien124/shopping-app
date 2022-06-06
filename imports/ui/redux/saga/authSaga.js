import { Meteor } from "meteor/meteor";
import { fork, put, takeLatest } from "redux-saga/effects";
import {
  loginFailed,
  loginSuccess,
  LOGIN_REQUEST,
  logoutAuth,
  LOGOUT_REQUEST,
} from "../actions/authAction";

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

const promiseLogin = (user, password) =>
  new Promise((resolve, reject) => {
    Meteor.loginWithPassword(user, password, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

const promiseLogout = () =>
  new Promise((resolve, reject) => {
    Meteor.logout((error) => {
      if (error) {
        reject({ isSuccess: false, error });
      } else {
        resolve({ isSuccess: true });
      }
    });
  });

function* login({ payload }) {
  try {
    const username = payload.username.replace("@", "AtSign");

    yield promiseLogin(username, payload.password);

    const user = Meteor.user();

    if (user) {
      yield put(
        loginSuccess({
          userId: user._id,
          username: user.username,
          fullName: user.profile.fullName,
          isAdmin: user.profile.isAdmin,
        })
      );
    }
  } catch (err) {
    yield put(loginFailed(err.reason));
  }
}

function* logout() {
  let logoutSuccess = null;
  yield promiseLogout()
    .then((result) => (logoutSuccess = result))
    .catch((error) => (logoutSuccess = error));

  if (logoutSuccess.isSuccess) {
    yield put(logoutAuth());
  } else {
    console.log("logout failed");
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

export default function* authSaga() {
  yield fork(watchLogin);
  yield fork(watchLogout);
}
