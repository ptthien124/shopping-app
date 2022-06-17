import { CONSTANTS } from "../actions/product";

const initialState = {
  loading: false,
  type: "",
  error: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD.REQUEST: {
      return {
        type: "add",
        loading: true,
        error: "",
      };
    }
    case CONSTANTS.ADD.SUCCESS: {
      return {
        type: "add",
        loading: false,
        error: "",
      };
    }
    case CONSTANTS.ADD.FAIL: {
      return {
        type: "add",
        loading: false,
        error: action.payload.error,
      };
    }

    case CONSTANTS.UPDATE.REQUEST: {
      return {
        type: "update",
        loading: true,
        error: "",
      };
    }
    case CONSTANTS.UPDATE.SUCCESS: {
      return {
        type: "update",
        loading: false,
        error: "",
      };
    }
    case CONSTANTS.UPDATE.FAIL: {
      return {
        type: "update",
        loading: false,
        error: action.payload.error,
      };
    }

    case CONSTANTS.REMOVE.REQUEST: {
      return {
        type: "remove",
        loading: true,
        error: "",
      };
    }
    case CONSTANTS.REMOVE.SUCCESS: {
      return {
        type: "remove",
        loading: false,
        error: "",
      };
    }
    case CONSTANTS.REMOVE.FAIL: {
      return {
        type: "remove",
        loading: false,
        error: action.payload.error,
      };
    }

    default:
      return state;
  }
};

export default productReducer;
