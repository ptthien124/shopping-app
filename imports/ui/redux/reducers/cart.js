import { CONSTANTS } from "../actions/cart";

const initialState = { list: [], pending: false, error: "" };

const findIndex = (list, _id, userId) => {
  let existed = -1;
  const length = list.length;
  for (let i = 0; i < length; i++) {
    if (list[i]?._id === _id && list[i]?.userId === userId) {
      existed = i;
      break;
    }
  }
  return existed;
};

// @Todo Need to update like auth
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_TO_CART.REQUEST: {
      return { ...state, pending: true, error: "" };
    }
    case CONSTANTS.ADD_TO_CART.SUCCESS: {
      const newState = { ...state, pending: false, error: "" };

      const existed = findIndex(
        newState.list,
        action.payload._id,
        action.payload.userId
      );

      if (existed !== -1) newState.list[existed].quantity += 1;
      else newState.list.push(action.payload);

      return { ...newState };
    }
    case CONSTANTS.ADD_TO_CART.FAIL: {
      return { ...state, pending: false, error: action.payload.error };
    }

    case CONSTANTS.REMOVE_FROM_CART.REQUEST: {
      return { ...state, pending: true, error: "" };
    }
    case CONSTANTS.REMOVE_FROM_CART.SUCCESS: {
      const newState = { ...state, pending: false, error: "" };

      const existed = findIndex(
        newState.list,
        action.payload._id,
        action.payload.userId
      );

      if (existed !== -1) newState.list[existed].quantity -= 1;
      if (newState.list[existed].quantity <= 0)
        newState.list.splice(existed, 1);

      return { ...newState };
    }
    case CONSTANTS.REMOVE_FROM_CART.FAIL: {
      return { ...state, pending: false, error: action.payload.error };
    }

    default:
      return state;
  }
};
export default cartReducer;
