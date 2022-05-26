const ADD_USER = "ADD_USER";

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
})