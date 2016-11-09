import {PropTypes} from 'react';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
export function merge (dst, src) {
    return {...mergeWith(dst, src, (objValue, srcValue) => {
        //чтобы не мержить массиы, возвращается исходный
        if (isArray(objValue)) {
            return srcValue;
        }
    })}
}

/**
 * Returns object for storing current state of async actions
 * @param {Object || Array} actionTypes - object with pairs of action types CONSTANT:ACTION_NAME, or array of action names
 * @example
 * 1.
 *  const asyncActions = {
 *      LOAD: LOAD@USER_ACTION,
 *      LOGIN: LOGIN@USER_ACTION,
 *      LOGOUT: LOGOUT@USER_ACTION
 *  }
 *  const asyncDefaults = createAsyncDefaults(asyncActions);
 *
 * 2.
 * const asyncActions = [LOAD@USER_ACTION, LOGIN@USER_ACTION, LOGOUT@USER_ACTION]
 * const asyncDefaults = createAsyncDefaults(asyncActions);
 *
 * @returns {Object} - returns shape where all keys set in PropTypes.bool.isRequired
 *
 */
export function createAsyncShape(actionTypes) {
    if (typeof actionTypes !== 'object') {
        throw new Error(`actions types must be of array or object type, but ${typeof actionTypes} provided`);
    }
    if (isArray(actionTypes)) {
        return actionTypes.reduce((res, actionType) => (res[actionType] = PropTypes.bool.isRequired, res), {});
    }
    else {
        return Object.keys(actionTypes).reduce((res, key) => (res[actionTypes[key]] = PropTypes.bool.isRequired, res), {});
    }
}

/**
 * Returns object for storing current state of async actions
 * @param {Object || Array} actionTypes - object with pairs of action types CONSTANT:ACTION_NAME, or array of action names
 * @example
 * 1.
 *  const asyncActions = {
 *      LOAD: LOAD@USER_ACTION,
 *      LOGIN: LOGIN@USER_ACTION,
 *      LOGOUT: LOGOUT@USER_ACTION
 *  }
 *  const asyncDefaults = createAsyncDefaults(asyncActions);
 *
 * 2.
 * const asyncActions = [LOAD@USER_ACTION, LOGIN@USER_ACTION, LOGOUT@USER_ACTION]
 * const asyncDefaults = createAsyncDefaults(asyncActions);
 *
 * @returns {Object} - returns object where all keys set in false
 *
 */
export function createAsyncDefaults(actionTypes) {
    if (typeof actionTypes !== 'object') {
        throw new Error(`actions types must be of array or object type, but ${typeof actionTypes} provided`);
    }
    if (isArray(actionTypes)) {
        return actionTypes.reduce((res, actionType) => (res[actionType] = false, res), {});
    }
    else {
        return Object.keys(actionTypes).reduce((res, key) => (res[actionTypes[key]] = false, res), {});
    }
}