import { CONSTANTS } from "../actions/auth";

const initialState = {
  userData: {},
  loading: false,
  error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.LOGIN.REQUEST: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case CONSTANTS.LOGIN.SUCCESS: {
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
        loading: false,
      };
    }
    case CONSTANTS.LOGIN.FAIL: {
      return {
        ...initialState,
        loading: false,
        error: action.payload.error,
      };
    }

    case CONSTANTS.LOGOUT.REQUEST:
      return { ...state, loading: true, error: "" };

    case CONSTANTS.LOGOUT.SUCCESS:
      return { ...initialState, loading: false, error: "" };

    case CONSTANTS.LOGOUT.FAIL:
      return { ...state, loading: false, error: action.payload.error };

    case CONSTANTS.SIGN_UP.REQUEST:
      return { ...state, loading: true, error: "" };

    case CONSTANTS.SIGN_UP.SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };

    case CONSTANTS.SIGN_UP.FAIL:
      return {
        ...initialState,
        loading: false,
        error: action.payload.error,
      };

    case "SIGN_UP_FAIL_OK":
      return { ...initialState };

    default:
      return state;
  }
};

export default authReducer;
