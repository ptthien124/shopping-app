const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: { ...product },
});

export const removeFromCart = ({ _id, quantity, userId }) => ({
  type: REMOVE_FROM_CART,
  payload: { _id, quantity, userId },
});
