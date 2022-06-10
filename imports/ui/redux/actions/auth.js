import { factoryConstant, factoryAction } from "../utils";

export const AUTH_REDUCER_NAME = 'auth';

export const CONSTANTS = {
  LOGIN: factoryConstant(AUTH_REDUCER_NAME, 'LOGIN'),
  LOGOUT: factoryConstant(AUTH_REDUCER_NAME, 'LOGOUT'),
  SIGN_UP: factoryConstant(AUTH_REDUCER_NAME, 'SIGN_UP'),
}

export const ACTIONS = {
  LOGIN: factoryAction(CONSTANTS.LOGIN),
  LOGOUT: factoryAction(CONSTANTS.LOGOUT),
  SIGN_UP: factoryAction(CONSTANTS.SIGN_UP)
}
