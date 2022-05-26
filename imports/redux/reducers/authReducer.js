const initialState = null;
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      const newAuth = { ...action.payload };

      return { ...newAuth };
    }
    case "LOGOUT": {
      return null;
    }
    default:
      return state;
  }
};
export default authReducer;
