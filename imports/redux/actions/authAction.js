const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const loginAuth = ({ email, password, fullName, gender }) => ({
  type: LOGIN,
  payload: { email, password, fullName, gender },
});

export const logoutAuth = () => ({
  type: LOGOUT,
});
