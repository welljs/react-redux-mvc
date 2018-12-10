"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var Controller = (function () {
    function Controller(Model, props, context) {
        var _this = this;
        this.storeKey = '';
        this.actions = {};
        this.onInit = function () { return Promise.resolve(); };
        this.getState = function (prop) {
            if (_this.storeKey) {
                return prop ? lodash_1.get(_this.getGlobalState()[_this.storeKey], prop) : _this.getGlobalState()[_this.storeKey];
            }
        };
        this.Model = Model;
        this.storeKey = this.constructor.storeKey;
        this.actions = this.constructor.actions;
    }
    Controller.prototype.componentWillReceiveProps = function (currentProps, nextProps) { };
    Controller.prototype.mappedProps = function (state) {
        return this.constructor.connectedState.reduce(function (result, prop) {
            var key = prop;
            if (prop.includes(':')) {
                var parts = prop.split(':');
                prop = parts[0];
                key = parts[1];
            }
            return (result[key] = lodash_1.get(state, prop), result);
        }, {});
    };
    Controller.prototype.action = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof name === 'function') {
            return this.dispatch(name.apply(undefined, args));
        }
        var action = this.actions[name];
        if (typeof action !== 'function') {
            throw Error('Action must be a function');
        }
        return this.dispatch(action.apply(undefined, args));
    };
    Controller.prototype.getWaiting = function () {
        if (this.Model) {
            return new this.Model(this.getState()).getWaiting();
        }
        else {
            noModelWarning(this.name);
            return {};
        }
    };
    Controller.prototype.isWaiting = function (prop) {
        if (this.Model) {
            return new this.Model(this.getState()).isWaiting(prop);
        }
        else {
            noModelWarning(this.name);
            return false;
        }
    };
    Controller.prototype.isFailed = function (prop) {
        if (this.Model) {
            return new this.Model(this.getState()).isFailed(prop);
        }
        else {
            noModelWarning(this.name);
            return false;
        }
    };
    Controller.prototype.getFailed = function () {
        if (this.Model) {
            return new this.Model(this.getState()).getFailed();
        }
        else {
            noModelWarning(this.name);
            return {};
        }
    };
    Controller.propsTypes = {};
    Controller.connectedState = [];
    Controller.actions = {};
    Controller.storeKey = '';
    return Controller;
}());
exports.Controller = Controller;
function noModelWarning(controllerName) {
    throw new Error("There is Model provided to " + controllerName);
}
Controller.prototype.name = 'BasicController';
Controller.prototype.dispatch = function (action) {
    return action;
};
Controller.prototype.getGlobalState = function () {
};
Controller.prototype.componentWillReceiveProps = function () {
};
//# sourceMappingURL=Controller.js.map