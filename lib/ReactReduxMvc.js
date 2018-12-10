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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prop_types_1 = require("prop-types");
var ReactReduxMvc = (function (_super) {
    __extends(ReactReduxMvc, _super);
    function ReactReduxMvc(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.store = props.store;
        return _this;
    }
    ReactReduxMvc.prototype.getChildContext = function () {
        return {
            store: this.store
        };
    };
    ReactReduxMvc.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    ReactReduxMvc.childContextTypes = {
        store: function () { return null; }
    };
    ReactReduxMvc.propTypes = {
        children: prop_types_1.element.isRequired,
        store: prop_types_1.object.isRequired
    };
    return ReactReduxMvc;
}(React.Component));
exports.ReactReduxMvc = ReactReduxMvc;
//# sourceMappingURL=ReactReduxMvc.js.map