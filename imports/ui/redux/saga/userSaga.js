import { Meteor } from "meteor/meteor";
import { fork, put, takeEvery } from "redux-saga/effects";
import { loginFailed, loginSuccess } from "../actions/authAction";
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

function* signUp(payload) {
  try {
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
      yield put(signUpFailed("Username existed"));
    } else {
      const newUser = yield call("user.signUp", { ...data });

      if (newUser._id) {
        yield put(signUpSuccess({ userId: newUser.userId }));

        let status = null;

        yield promiseLogin(
          (user = username),
          (password = payload.payload.password)
        )
          .then((result) => (status = result))
          .catch((error) => (status = error));

        if (status.isSuccess) {
          // sign up success => login
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
      } else {
        console.log("sign up failed");
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
