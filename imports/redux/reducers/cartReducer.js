const initialState = [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newState = [...state];
      let existed = -1;
      for (let i = 0; i < newState.length; i++) {
        if (
          newState[i]._id === action.payload._id &&
          newState[i].user.email === action.payload.user.email &&
          newState[i].user.password === action.payload.user.password
        ) {
          existed = i;
          break;
        }
      }

      if (existed != -1) newState[existed].quantity += 1;
      else newState.push(action.payload);
      return [...newState];
    }
    case "REMOVE_FROM_CART": {
      const newState = [...state];
      let existed = -1;
      for (let i = 0; i < newState.length; i++) {
        if (
          newState[i]._id === action.payload._id &&
          newState[i].user.email === action.payload.user.email &&
          newState[i].user.password === action.payload.user.password
        ) {
          existed = i;
          break;
        }
      }

      if (existed != -1) newState[existed].quantity -= 1;
      if (newState[existed].quantity <= 0) newState.splice(existed, 1);
    }
    default:
      return state;
  }
};
export default cartReducer;
