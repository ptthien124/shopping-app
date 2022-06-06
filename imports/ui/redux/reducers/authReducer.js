const initialState = {
  _id: "",
  isAdmin: false,
  username: "",
  fullName: "",
  logging: false,
  isLoggedIn: false,
  loginFailed: false,
  loginFailedReason: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST": {
      console.log("logging in");
      const newAuth = {
        ...action.payload,
        logging: true,
        isLoggedIn: false,
        loginFailed: false,
        loginFailedReason: "",
      };

      return newAuth;
    }
    case "LOGIN_SUCCESS": {
      console.log("login success");
      const newAuth = {
        ...action.payload,
        logging: false,
        isLoggedIn: true,
        loginFailed: false,
        loginFailedReason: "",
      };
      return newAuth;
    }
    case "LOGIN_FAILED": {
      console.log("login failed", action.payload);
      return {
        ...initialState,
        loginFailed: true,
        loginFailedReason: action.payload,
      };
    }

    case "LOGOUT_REQUEST":
      console.log("logging out");
      return initialState;

    case "LOGOUT":
      console.log("logout success");
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
