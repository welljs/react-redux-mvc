'use strict';exports.__esModule = true;exports.default = undefined;var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _class, _temp;var _react = require('react');
var _get2 = require('lodash/get');var _get3 = _interopRequireDefault(_get2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function noModelWarning(controllerName) {
    throw new Error('There is Model provided to ' + controllerName);
}

//Базовый контроллер
var Controller = (_temp = _class = function () {




    //список полей, которые надо получить из стора.
    // чтобы получить вложенные, надо указать их через точку: routing.location



    function Controller(Model) {(0, _classCallCheck3.default)(this, Controller);this.storeKey = null;this.






















































        onInit = function () {return _promise2.default.resolve();};this.Model = Model;this.checkSettings();this.storeKey = this.constructor.storeKey;this.actions = this.constructor.actions;this.propTypes = this.constructor.propTypes;} /**
                                                                                                                                                                                                                                            * проверяет, чтобы все необходимое было установлено
                                                                                                                                                                                                                                            */ //действия которые надо обернуть dispatch-ем
    //propsType bind to connected component
    Controller.prototype.checkSettings = function checkSettings() {if (!this.constructor.storeKey) {throw new Error('Store key in ' + this.name + ' must be defined');}}; /**
                                                                                                                                                                           * используется для коннекта к стору
                                                                                                                                                                           * @example ['currentContract', 'routing.location:location']
                                                                                                                                                                           * @param {[String]} state - свойства стора которые надо приконенктить
                                                                                                                                                                           * @returns {*}
                                                                                                                                                                           */Controller.prototype.mappedProps = function mappedProps(state) {return this.constructor.connectedState.reduce(function (result, prop) {var key = prop;if (prop.includes(':')) {var parts = prop.split(':');prop = parts[0];key = parts[1];}return result[key] = (0, _get3.default)(state, prop), result;}, {});}; /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * диспатчит действие
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @param args
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */Controller.prototype.action = function action() {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}var name = args[0];var restArguments = args.slice(1);if (typeof name === 'function') {return this.dispatch(name.apply(undefined, restArguments));}var action = this.actions[name];if (typeof action !== 'function') {throw Error('Action must be a function');}return this.dispatch(action.apply(undefined, restArguments));}; /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * запсускается при инициализации, для первоначальных загрузок.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * ! Пока не выполнится, не происходит первый рендер
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */ /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * Возвращает connected state. Может быть вложенным.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @example getState('routing'); getState('routing.location')
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param {String} prop
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @returns {undefined}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */Controller.prototype.getState = function getState(prop) {return prop ? (0, _get3.default)(this.getGlobalState()[this.storeKey], prop) : this.getGlobalState()[this.storeKey];}; /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * возвращает ожидающие
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * @returns {*}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */Controller.prototype.getWaiting = function getWaiting() {if (this.Model) {return new this.Model(this.getState()).getWaiting();} else {noModelWarning(this.name);}};Controller.prototype.


    isWaiting = function isWaiting(prop) {
        if (this.Model) {
            return !!new this.Model(this.getState()).isWaiting(prop);
        } else
        {
            noModelWarning(this.name);
        }

    };Controller.prototype.

    isFailed = function isFailed(prop) {
        if (this.Model) {
            return !!new this.Model(this.getState()).isFailed(prop);
        } else
        {
            noModelWarning(this.name);
        }
    };

    /**
        * возвращает ошибки
        * @returns {*}
        */Controller.prototype.
    getFailed = function getFailed() {
        if (this.Model) {
            return new this.Model(this.getState()).getFailed();
        } else
        {
            noModelWarning(this.name);
        }

    };return Controller;}(), _class.propsTypes = {}, _class.connectedState = [], _class.actions = {}, _temp);exports.default = Controller;


Controller.prototype.name = 'BasicController';
//withController должен передать сюда реальный диспатчер
Controller.prototype.dispatch = function () {};
Controller.prototype.getGlobalState = function () {};
Controller.prototype.componentWillReceiveProps = function () {};module.exports = exports['default'];