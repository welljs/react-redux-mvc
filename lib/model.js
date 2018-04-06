'use strict';exports.__esModule = true;var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _propTypes = require('prop-types');
var _get2 = require('lodash/get');var _get3 = _interopRequireDefault(_get2);
var _set2 = require('lodash/set');var _set3 = _interopRequireDefault(_set2);
var _isPlainObject2 = require('lodash/isPlainObject');var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);
var _cloneDeep = require('lodash/cloneDeep');var _cloneDeep2 = _interopRequireDefault(_cloneDeep);
var _helpers = require('./helpers');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Model = function () {Model.prototype.





    _prepare = function _prepare(data) {
        this.reset(data);
    };Model.prototype.
    onInit = function onInit() {
        return this;
    };

    function Model(props) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};(0, _classCallCheck3.default)(this, Model);this.state = { __waiting: {}, __failed: {} };
        this.options = options;
        this._prepare(props);
        this._createShape();
        this.onInit();
    }Model.prototype.

    setWaiting = function setWaiting(prop) {
        this.set('__waiting.' + prop, true);
        return this;
    };Model.prototype.

    resetWaiting = function resetWaiting(prop) {
        this.set('__waiting.' + prop, false);
        return this;
    };Model.prototype.

    setFailed = function setFailed(prop) {
        this.set('__failed.' + prop, true);
        return this;
    };Model.prototype.

    resetFailed = function resetFailed(prop) {
        this.set('__failed.' + prop, false);
        return this;
    };Model.prototype.

    isWaiting = function isWaiting(key) {
        return !!this.getState('__waiting.' + key);
    };Model.prototype.

    isFailed = function isFailed(key) {
        return !!this.getState('__failed.' + key);
    };Model.prototype.

    getWaiting = function getWaiting() {
        return this.getState('__waiting');
    };Model.prototype.

    getFailed = function getFailed() {
        return this.getState('__failed');
    };Model.prototype.

    _createShape = function _createShape() {
        this.constructor.shape = (0, _assign2.default)((0, _extends3.default)({},
        this.constructor.shape || {}, {
            __waiting: _propTypes.object.isRequired,
            __failed: _propTypes.object.isRequired }));

    };

    /**
        * устанавливает значение prop в value
        * @param {String|Object} prop
        * @param value
        */Model.prototype.
    set = function set(prop, value) {
        if (!prop) {
            throw Error('Property must be set');
        }
        //устанавливает значения для целого объекта
        if ((0, _isPlainObject3.default)(prop)) {
            var key = (0, _keys2.default)(prop)[0];
            var piece = this.getState(key);
            //для вложенных свойств
            if (key && !!~key.indexOf('.') && piece && !!prop[key]) {
                (0, _set3.default)(this.state, key, (0, _helpers.merge)((0, _cloneDeep2.default)(piece), prop[key]));
            } else
            {
                this.state = (0, _helpers.merge)((0, _cloneDeep2.default)(this.state), prop);
            }
        } else
        if (typeof prop === 'string' && value !== undefined) {
            //позволяет устанавливать значения для вложенных ключей. Нармер set('user.name','Ivan')
            (0, _set3.default)(this.state, prop, value);
        }
        return this;
    };Model.prototype.

    update = function update(updates) {
        this.set(updates);
        return this;
    };Model.prototype.

    getState = function getState(prop) {
        return prop ? (0, _get3.default)(this.state, prop) : this.state;
    };Model.prototype.

    reset = function reset(newState) {
        this.state = (0, _cloneDeep2.default)(newState);
        return this;
    };Model.prototype.

    equals = function equals(prop, value) {var exact = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return exact ? this.getState(prop) === value : this.getState(prop) == value;
    };Model.prototype.

    includes = function includes(prop, value) {var caseSensitive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (caseSensitive) {
            return !!~(this.getState(prop) || '').indexOf(value);
        } else
        {
            return !!~(this.getState(prop) || '').toLocaleLowerCase().indexOf(value.toLocaleLowerCase());
        }

    };return Model;}();exports.default =


Model;module.exports = exports['default'];