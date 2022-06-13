const initialState = {
  path: "/",
};

const routerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NAVIGATE": {
      return { ...state, path: action.payload };
    }

    default:
      return state;
  }
};

export default routerReducer;
