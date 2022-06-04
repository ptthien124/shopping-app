import { Meteor } from "meteor/meteor";
import { fork, put, takeEvery } from "redux-saga/effects";
import { loginFailed, loginSuccess } from "../actions/authAction";
import {
  signUpFailed,
  signUpSuccess,
  SIGN_UP_REQUEST,
} from "../actions/userAction";

function* signUp(payload) {
  try {
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

    const username = payload.payload.username.replace("@", "AtSign");

    const data = {
      username,
      password: payload.payload.password,
      fullName: payload.payload.fullName,
      gender: payload.payload.gender,
    };

    const isUserExisted = yield call("user.isUserNameExisted", {
      username: data.username,
      password: data.password,
    });

    if (isUserExisted) {
      yield put(loginFailed("Username existed"));
    } else {
      const newUser = yield call("user.signUp", { ...data });

      yield put(signUpSuccess({ userId: newUser.userId }));
      yield put(
        loginSuccess({
          username: newUser.username,
          fullName: newUser.fullName,
          userId: newUser.userId,
          isAdmin: newUser.isAdmin,
        })
      );
    }
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield fork(watchSignUp);
}
