const initialState = {
  userId: "",
  signingUp: false,
  isSignUpSuccess: false,
  isSignUpFailed: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_UP_REQUEST": {
      console.log("signing up");
      const newState = {
        ...action.payload,
        signingUp: true,
        isSignUpSuccess: false,
        isSignUpFailed: false,
        error: null,
      };

      return newState;
    }

    case "SIGN_UP_SUCCESS": {
      console.log("sign up success");
      const newState = {
        ...action.payload,
        signingUp: false,
        isSignUpSuccess: true,
        isSignUpFailed: false,
        error: null,
      };

      return newState;
    }

    case "SIGN_UP_FAILED": {
      console.log("sign up failed", action.payload);

      return {
        ...initialState,
        isSignUpFailed: true,
        error: action.payload,
      };
    }

    case "SIGN_UP_DEFAULT":
      console.log("return initial state");
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
