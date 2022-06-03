import { Meteor } from "meteor/meteor";
import { fork, put, takeEvery } from "redux-saga/effects";
import { loginSuccess } from "../actions/authAction";
import {
  signUpFailed,
  signUpSuccess,
  SIGN_UP_REQUEST
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

    let catchError = null;
    let isUserExisted = null;

    const indexOfAtSign = payload.payload.username.indexOf("@");
    const username =
      payload.payload.username.slice(0, indexOfAtSign) +
      payload.payload.username.slice(indexOfAtSign + 1);

    yield call("user.isUserNameExisted", {
      username: username,
      password: payload.payload.password,
    })
      .then((result) => (isUserExisted = result))
      .catch((error) => (catchError = error));

    if (catchError) {
      yield put(signUpFailed(catchError));
    } else if (isUserExisted) {
      if (!isUserExisted.isUserExisted) {
        let result = null;
        yield call("user.signUp", {
          username,
          password: payload.payload.password,
          gender: payload.payload.gender,
          fullName: payload.payload.fullName,
        })
          .then((res) => (result = res))
          .catch((error) => (result = error));

        yield put(signUpSuccess(result));
        yield put(loginSuccess(result));
      }
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
