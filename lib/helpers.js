'use strict';exports.__esModule = true;var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);var _typeof2 = require('babel-runtime/helpers/typeof');var _typeof3 = _interopRequireDefault(_typeof2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);exports.


merge = merge;exports.



























createAsyncShape = createAsyncShape;exports.






























createAsyncDefaults = createAsyncDefaults;var _react = require('react');var _mergeWith = require('lodash/mergeWith');var _mergeWith2 = _interopRequireDefault(_mergeWith);var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function merge(dst, src) {return (0, _extends3.default)({}, (0, _mergeWith2.default)(dst, src, function (objValue, srcValue) {//чтобы не мержить массиы, возвращается исходный
        if ((0, _isArray2.default)(objValue)) {return srcValue;}}));} /**
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
                                                                       */function createAsyncShape(actionTypes) {if ((typeof actionTypes === 'undefined' ? 'undefined' : (0, _typeof3.default)(actionTypes)) !== 'object') {throw new Error('actions types must be of array or object type, but ' + (typeof actionTypes === 'undefined' ? 'undefined' : (0, _typeof3.default)(actionTypes)) + ' provided');}if ((0, _isArray2.default)(actionTypes)) {return actionTypes.reduce(function (res, actionType) {return res[actionType] = _react.PropTypes.bool.isRequired, res;}, {});} else {return (0, _keys2.default)(actionTypes).reduce(function (res, key) {return res[actionTypes[key]] = _react.PropTypes.bool.isRequired, res;}, {});}} /**
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */function createAsyncDefaults(actionTypes) {if ((typeof actionTypes === 'undefined' ? 'undefined' : (0, _typeof3.default)(actionTypes)) !== 'object') {throw new Error('actions types must be of array or object type, but ' + (typeof actionTypes === 'undefined' ? 'undefined' : (0, _typeof3.default)(actionTypes)) + ' provided');}if ((0, _isArray2.default)(actionTypes)) {return actionTypes.reduce(function (res, actionType) {return res[actionType] = false, res;}, {});} else {return (0, _keys2.default)(actionTypes).reduce(function (res, key) {return res[actionTypes[key]] = false, res;}, {});}}