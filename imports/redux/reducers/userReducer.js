const initialState = [
  {
    email: "admin@example.com",
    password: "admintest",
    fullName: "admin",
    gender: "male",
  },
  {
    email: "admin1@example.com",
    password: "admintest",
    fullName: "admin",
    gender: "male",
  },
];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER": {
      const newState = [...state];
      newState.push(action.payload);
      return [...newState];
    }
    case "REMOVE_USER": {
      const newState = [...state];
      const index = newState.indexOf(action.payload);
      newState.splice(index, 1);
      return [...newState];
    }
    default:
      return state;
  }
};
export default userReducer;
