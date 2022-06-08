import { Meteor } from "meteor/meteor";
import { fork, put, takeLatest } from "redux-saga/effects";
import { loginSuccess } from "../actions/authAction";
import {
  signUpFailed,
  signUpSuccess,
  SIGN_UP_REQUEST,
} from "../actions/userAction";

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
        reject({ isSuccess: false, error });
      } else {
        resolve({ isSuccess: true });
      }
    });
  });

function* signUp({ payload }) {
  try {
    const username = payload.username.replace("@", "AtSign");

    const data = {
      username,
      password: payload.password,
      fullName: payload.fullName,
      gender: payload.gender,
    };

    let status = {};

    yield call("user.signUp", { ...data })
      .then((result) => (status = result))
      .catch((error) => (status = error));

    if (!status.isSuccess) {
      yield put(signUpFailed(status.error));
    } else {
      yield put(
        signUpSuccess({
          username: status.username,
          fullName: status.fullName,
          gender: status.gender,
        })
      );

      // login
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
    }
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield fork(watchSignUp);
}
