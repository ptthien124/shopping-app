/**
 * Get Set of Constant
 *
 * @export
 * @param {String} reducerName
 * @param {String} actionName
 * @return {{ REQUEST: String, SUCCESS: String, FAIL: String }}
 */
export function factoryConstant(reducerName, actionName) {
  return {
    REQUEST: `${reducerName}/${actionName.toUpperCase()}_REQUEST`,
    SUCCESS: `${reducerName}/${actionName.toUpperCase()}_SUCCESS`,
    FAIL: `${reducerName}/${actionName.toUpperCase()}_FAIL`,
  };
}

/**
 * Return Set of Action
 *
 * @export
 * @param {{ REQUEST: String, SUCCESS: String, FAIL: String }} actionConstant
 * @return {{ REQUEST: Function, SUCCESS: Function, FAIL: Function }}
 */
export function factoryAction(actionConstant) {
  const constantKeys = Object.keys(actionConstant);

  return constantKeys.reduce((obj, curr, index) => {
    const key = constantKeys[index];

    obj[key] = (data = {}) => ({
      type: actionConstant[key],
      payload: data,
    });

    return obj;
  }, {});
}

export const meteorCall = (methodName, args = {}) =>
  new Promise((resolve, reject) => {
    Meteor.call(methodName, { ...args }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
