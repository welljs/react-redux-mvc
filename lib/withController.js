'use strict';exports.__esModule = true;var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);exports.





withController = withController;var _react = require('react');var _reactRedux = require('react-redux');var _hoistNonReactStatics = require('hoist-non-react-statics');var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);var _controller = require('./controller');var _controller2 = _interopRequireDefault(_controller);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function withController() {var Controller = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _controller2.default;
    return function (Component) {var _dec, _class, _class2, _temp;var

        Wrapper = (_dec = (0, _reactRedux.connect)(function (state) {return Controller.prototype.mappedProps(state);}), _dec(_class = (_temp = _class2 = function (_ReactComponent) {(0, _inherits3.default)(Wrapper, _ReactComponent);










            function Wrapper(props, context) {(0, _classCallCheck3.default)(this, Wrapper);var _this = (0, _possibleConstructorReturn3.default)(this,
                _ReactComponent.call(this, props, context));_this.state = { canRender: false };
                _this.store = props.store || context.store;
                Controller.prototype.name = Component.prototype.constructor.name + 'Controller';
                Controller.prototype.dispatch = _this.store.dispatch;

                Controller.prototype.getGlobalState = function (prop) {
                    return prop ? this.store.getState[prop] : this.store.getState;
                };

                var controller = new Controller();
                Component.prototype.controller = controller;
                controller.onInit().then(function () {return _this.setState({ canRender: true });});return _this;
            }Wrapper.prototype.

            render = function render() {var
                canRender = this.state.canRender;
                return canRender ? (0, _react.createElement)(Component, (0, _extends3.default)({}, this.props)) : null;
            };return Wrapper;}(_react.Component), _class2.contextTypes = { store: _react.PropTypes.object }, _class2.propTypes = Controller.propTypes, _temp)) || _class);

        if ((0, _isFunction2.default)(Component.prototype.componentWillReceiveProps) && (0, _isFunction2.default)(Controller.prototype.componentWillReceiveProps)) {(function () {
                var fn = Component.prototype.componentWillReceiveProps;
                Component.prototype.componentWillReceiveProps = function (nextPops) {
                    Controller.prototype.componentWillReceiveProps.call(Component.prototype.controller, this.props, nextPops);
                    fn.call(this, nextPops);
                };})();
        }
        return (0, _hoistNonReactStatics2.default)(Wrapper, Component);
    };
}