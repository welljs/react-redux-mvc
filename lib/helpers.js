'use strict';exports.__esModule = true;var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);exports.


merge = merge;exports.














generateGuid = generateGuid;var _react = require('react');var _mergeWith = require('lodash/mergeWith');var _mergeWith2 = _interopRequireDefault(_mergeWith);var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function merge(dst, src) {//чтобы не мержить массиы, возвращается исходный
    if ((0, _isArray2.default)(dst) && (0, _isArray2.default)(src)) {return src;} else {return (0, _extends3.default)({}, (0, _mergeWith2.default)(dst, src, function (objValue, srcValue) {//чтобы не мержить массиы, возвращается исходный
            if ((0, _isArray2.default)(objValue)) {return srcValue;}}));}}function generateGuid() {var S4 = function S4() {return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);};return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}