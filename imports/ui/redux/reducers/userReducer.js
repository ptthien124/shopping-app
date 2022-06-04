const initialState = {
  userId: "",
  signingUp: false,
  isSignUpSuccess: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_UP_REQUEST": {
      console.log("signing up");
      const newState = {
        ...action.payload,
        signingUp: true,
        isSignUpSuccess: false,
      };

      return newState;
    }

    case "SIGN_UP_SUCCESS": {
      console.log("sign up success");
      const newState = {
        ...action.payload,
        signingUp: false,
        isSignUpSuccess: true,
      };

      return newState;
    }

    case "SIGN_UP_FAILED": {
      console.log("sign up failed");

      return initialState;
    }

    default:
      return state;
  }
};

export default userReducer;
