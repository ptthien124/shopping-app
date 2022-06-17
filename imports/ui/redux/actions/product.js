import { factoryConstant, factoryAction } from "../utils";

export const PRODUCT_REDUCER_NAME = "product";

export const CONSTANTS = {
  ADD: factoryConstant(PRODUCT_REDUCER_NAME, "ADD"),
  UPDATE: factoryConstant(PRODUCT_REDUCER_NAME, "UPDATE"),
  REMOVE: factoryConstant(PRODUCT_REDUCER_NAME, "REMOVE"),
};

export const ACTIONS = {
  ADD: factoryAction(CONSTANTS.ADD),
  UPDATE: factoryAction(CONSTANTS.UPDATE),
  REMOVE: factoryAction(CONSTANTS.REMOVE),
};
