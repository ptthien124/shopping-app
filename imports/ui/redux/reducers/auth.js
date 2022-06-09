import { CONSTANTS } from "../actions/auth";

const initialState = {
  _id: "",
  userData: {},
  loading: false,
  error: ""
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.LOGIN.REQUEST: {
      return {
        ...state,
        loading: true,
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
        error: action.payload.error
      };
    }

    case CONSTANTS.LOGOUT.REQUEST:
      return {...initialState};

    default:
      return state;
  }
};

export default authReducer;
