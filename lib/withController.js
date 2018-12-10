"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var hoistStatics = require("hoist-non-react-statics");
var lodash_1 = require("lodash");
var Controller_1 = require("./Controller");
function mapStateToProps(Controller) {
    return function (state) {
        return Controller.prototype.mappedProps(state);
    };
}
function withController(Controller) {
    if (Controller === void 0) { Controller = Controller_1.Controller; }
    return function (Component) {
        var Wrapper = (function (_super) {
            __extends(Wrapper, _super);
            function Wrapper(props, context) {
                var _this = _super.call(this, props, context) || this;
                _this.state = {
                    canRender: false
                };
                _this.store = props.store || context.store;
                Controller.prototype.name = Component.prototype.constructor.name + 'Controller';
                Controller.prototype.dispatch = _this.store.dispatch;
                Controller.prototype.getGlobalState = function (prop) {
                    return prop ? this.store.getState()[prop] : this.store.getState();
                }.bind(_this);
                var controller = new Controller(props, context);
                Component.prototype.controller = controller;
                controller.onInit().then(function () { return _this.setState({ canRender: true }); });
                return _this;
            }
            Wrapper.prototype.render = function () {
                var canRender = this.state.canRender;
                return canRender ? React.createElement(Component, __assign({}, this.props)) : null;
            };
            Wrapper.contextTypes = {
                store: function () { return null; }
            };
            return Wrapper;
        }(React.Component));
        var connectedWrapper = react_redux_1.connect(mapStateToProps(Controller))(Wrapper);
        var fn = Component.prototype.componentWillReceiveProps;
        Component.prototype.componentWillReceiveProps = function (nextPops) {
            Controller.prototype.componentWillReceiveProps.call(Component.prototype.controller, this.props, nextPops);
            if (lodash_1.isFunction(fn)) {
                fn.call(this, nextPops);
            }
        };
        return hoistStatics(connectedWrapper, Component);
    };
}
exports.withController = withController;
//# sourceMappingURL=withController.js.map