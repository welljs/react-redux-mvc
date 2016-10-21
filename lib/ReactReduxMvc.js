'use strict';exports.__esModule = true;exports.default = undefined;var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _class, _temp;var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _helpers = require('./helpers');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
    if (didWarnAboutReceivingStore) {
        return;
    }
    didWarnAboutReceivingStore = true;

    (0, _helpers.warning)(
    '<ReactReduxMvc> does not support changing `store` on the fly. ' +
    'It is most likely that you see this error because you updated to ' +
    'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' +
    'automatically. See https://github.com/reactjs/react-redux/releases/' +
    'tag/v2.0.0 for the migration instructions.');

}var



ReactReduxMvc = (_temp = _class = function (_Component) {(0, _inherits3.default)(ReactReduxMvc, _Component);ReactReduxMvc.prototype.









    getChildContext = function getChildContext() {
        return { store: this.store };
    };

    function ReactReduxMvc(props, context) {(0, _classCallCheck3.default)(this, ReactReduxMvc);var _this = (0, _possibleConstructorReturn3.default)(this,
        _Component.call(this, props, context));
        _this.store = props.store;return _this;
    }ReactReduxMvc.prototype.

    render = function render() {
        return _react.Children.only(this.props.children);
    };return ReactReduxMvc;}(_react.Component), _class.propTypes = { children: _react.PropTypes.element.isRequired, store: _react.PropTypes.object.isRequired }, _class.childContextTypes = { store: _react.PropTypes.object.isRequired }, _temp);exports.default = ReactReduxMvc;


if (process.env.NODE_ENV !== 'production') {
    ReactReduxMvc.prototype.componentWillReceiveProps = function (nextProps) {var
        store = this.store;var
        nextStore = nextProps.store;

        if (store !== nextStore) {
            warnAboutReceivingStore();
        }
    };
}module.exports = exports['default'];