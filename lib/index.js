'use strict';exports.__esModule = true;exports.ReactReduxMvc = exports.withController = exports.Model = exports.Controller = undefined;var _controller = require('./controller');Object.defineProperty(exports, 'Controller', { enumerable: true, get: function get() {return _interopRequireDefault(_controller).
    default;} });var _easyRedux = require('easy-redux');
var _model = require('./model');var _model2 = _interopRequireDefault(_model);
var _ReactReduxMvc = require('./ReactReduxMvc');var _ReactReduxMvc2 = _interopRequireDefault(_ReactReduxMvc);
var _withController = require('./withController');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.

Model = _model2.default;exports.withController = _withController.withController;exports.ReactReduxMvc = _ReactReduxMvc2.default;

//--------------- create action