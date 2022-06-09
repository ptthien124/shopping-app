import { factoryConstant, factoryAction } from "../utils";

export const CART_REDUCER_NAME = 'cart';

export const CONSTANTS = {
  ADD_TO_CART: factoryConstant(CART_REDUCER_NAME, 'ADD_TO_CART'),
  REMOVE_FROM_CART: factoryConstant(CART_REDUCER_NAME, 'REMOVE_FROM_CART'),
}

export const ACTIONS = {
  ADD_TO_CART: factoryAction(CONSTANTS.ADD_TO_CART),
  REMOVE_FROM_CART: factoryAction(CONSTANTS.REMOVE_FROM_CART)
}
