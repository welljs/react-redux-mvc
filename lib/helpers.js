'use strict';exports.__esModule = true;var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);exports.

merge = merge;exports.









warning = warning;var _mergeWith = require('lodash/mergeWith');var _mergeWith2 = _interopRequireDefault(_mergeWith);var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function merge(dst, src) {return (0, _extends3.default)({}, (0, _mergeWith2.default)(dst, src, function (objValue, srcValue) {//чтобы не мержить массиы, возвращается исходный
        if ((0, _isArray2.default)(objValue)) {return srcValue;}}));}function warning(message) {/* eslint-disable no-console */
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error(message);
    }
    /* eslint-enable no-console */
    try {
        // This error was thrown as a convenience so that if you enable
        // "break on all exceptions" in your console,
        // it would pause the execution at this line.
        throw new Error(message);
        /* eslint-disable no-empty */
    } catch (e) {}
    /* eslint-enable no-empty */
}