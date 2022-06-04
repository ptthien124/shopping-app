export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILED = "SIGN_UP_FAILED";
export const SIGN_UP_DEFAULT = "SIGN_UP_DEFAULT";

export const signUpRequest = ({ username, password, fullName, gender }) => ({
  type: SIGN_UP_REQUEST,
  payload: { username, password, fullName, gender },
});

export const signUpSuccess = ({ username, fullName, gender }) => ({
  type: SIGN_UP_SUCCESS,
  payload: { username, fullName, gender },
});

export const signUpFailed = (error) => ({
  type: SIGN_UP_FAILED,
  payload: error,
});

export const signUpDefault = () => ({
  type: SIGN_UP_DEFAULT,
});
