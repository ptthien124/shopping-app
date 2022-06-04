export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT = "LOGOUT";

export const loginSuccess = ({ username, fullName, userId, isAdmin }) => ({
  type: LOGIN_SUCCESS,
  payload: { username, fullName, userId, isAdmin },
});

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
});

export const loginRequest = ({ username, password }) => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutAuth = () => ({
  type: LOGOUT,
});
