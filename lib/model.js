'use strict';exports.__esModule = true;var _entries = require('babel-runtime/core-js/object/entries');var _entries2 = _interopRequireDefault(_entries);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _get2 = require('lodash/get');var _get3 = _interopRequireDefault(_get2);
var _set2 = require('lodash/set');var _set3 = _interopRequireDefault(_set2);
var _isPlainObject2 = require('lodash/isPlainObject');var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);
var _cloneDeep = require('lodash/cloneDeep');var _cloneDeep2 = _interopRequireDefault(_cloneDeep);
var _helpers = require('./helpers');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function prepare(obj) {
    return obj;
}var

Model = function () {Model.prototype.






    setWaiting = function setWaiting(prop) {
        this.set('waiting.' + prop, true);
        return this;
    };Model.prototype.

    resetWaiting = function resetWaiting(prop) {
        this.set('waiting.' + prop, false);
        return this;
    };Model.prototype.

    setFailed = function setFailed(prop) {
        this.set('failed.' + prop, true);
        return this;
    };Model.prototype.

    resetFailed = function resetFailed(prop) {
        this.set('failed.' + prop, false);
        return this;
    };Model.prototype.

    isWaiting = function isWaiting(key) {
        return this.state.waiting[key];
    };Model.prototype.

    isFailed = function isFailed(key) {
        return this.state.failed[key];
    };Model.prototype.

    getWaiting = function getWaiting() {
        return this.state.waiting;
    };Model.prototype.

    getFailed = function getFailed() {
        return this.state.failed;
    };

    /**
        * устанавливает значение prop в value
        * @param {String|Object} prop
        * @param value
        */Model.prototype.
    set = function set(prop, value) {var _this = this;
        if (!prop) {
            throw Error('Property must be set');
        }
        //устанавливает значения для целого объекта
        if ((0, _isPlainObject3.default)(prop)) {
            (0, _entries2.default)(prop).forEach(function (_ref) {var key = _ref[0];var value = _ref[1];
                if (value) {
                    _this.state[key] = value;
                }
            });
        } else
        if (typeof prop === 'string' && value !== undefined) {
            //позволяет устанавливать значения для вложенных ключей. Нармер set('user.name','Ivan')
            (0, _set3.default)(this.state, prop, value);
        }
        return this;
    };

    function Model(props) {(0, _classCallCheck3.default)(this, Model);this.state = { data: {}, waiting: {}, failed: {} };
        if (props) {
            this.state = prepare(props);
        }
    }Model.prototype.

    update = function update(data) {
        this.state = prepare(data);
        return this;
    };Model.prototype.

    getState = function getState(prop) {
        return prop ? (0, _get3.default)(this.state, prop) : this.state;
    };Model.prototype.

    updateState = function updateState(updates) {
        this.state = (0, _helpers.merge)((0, _cloneDeep2.default)(this.state), updates);
        return this;
    };Model.

    newState = function newState(oldState, updates) {
        return (0, _helpers.merge)((0, _cloneDeep2.default)(oldState), updates);
    };return Model;}();exports.default =



Model;module.exports = exports['default'];