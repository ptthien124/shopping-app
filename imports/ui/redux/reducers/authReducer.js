const initialState = {
  _id: "",
  username: "",
  fullName: "",
  logging: false,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST": {
      console.log("logging in");
      const newAuth = {
        ...action.payload,
        logging: true,
        isLoggedIn: false,
      };

      return newAuth;
    }
    case "LOGIN_SUCCESS": {
      console.log("login success");
      const newAuth = {
        ...action.payload,
        logging: false,
        isLoggedIn: true,
      };
      return newAuth;
    }
    case "LOGIN_FAILED": {
      console.log("login failed", action.payload);
    }

    case "LOGOUT_REQUEST":
      console.log("logging out");
      return state;

    case "LOGOUT":
      console.log("logout");
      return initialState;

    default:
      return state;
  }
};

export default authReducer;