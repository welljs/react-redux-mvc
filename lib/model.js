"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var helpers_1 = require("./helpers");
var stateDefaults = function () { return ({
    __waiting: {},
    __failed: {},
}); };
var Model = (function () {
    function Model(props, options) {
        this.options = options || {};
        this.prepare(props);
        this.onInit();
        return this;
    }
    Model.prototype.onInit = function () {
        return this;
    };
    Model.prototype.setWaiting = function (prop) {
        return this.set('__waiting.' + prop, true);
    };
    Model.prototype.resetWaiting = function (prop) {
        return this.set('__waiting.' + prop, false);
    };
    Model.prototype.setFailed = function (prop) {
        return this.set('__failed.' + prop, true);
    };
    Model.prototype.resetFailed = function (prop) {
        return this.set('__failed.' + prop, false);
    };
    Model.prototype.isWaiting = function (key) {
        return !!this.getState('__waiting.' + key);
    };
    Model.prototype.isFailed = function (key) {
        return !!this.getState('__failed.' + key);
    };
    Model.prototype.getWaiting = function () {
        return this.getState().__waiting;
    };
    Model.prototype.getFailed = function () {
        return this.getState('__failed');
    };
    Model.prototype.set = function (prop, value) {
        if (!prop) {
            throw Error('Property must be set');
        }
        if (lodash_1.isPlainObject(prop)) {
            var key = Object.keys(prop)[0];
            var piece = this.getState(key);
            if (key && !!~key.indexOf('.') && piece && !!prop[key]) {
                lodash_1.set(this.state, key, helpers_1.merge(lodash_1.cloneDeep(piece), prop[key]));
            }
            else {
                this.state = helpers_1.merge(lodash_1.cloneDeep(this.state), prop);
            }
        }
        else if (typeof prop === 'string' && value !== undefined) {
            lodash_1.set(this.state, prop, value);
        }
        return this;
    };
    Model.prototype.update = function (updates) {
        this.set(updates);
        return this;
    };
    Model.prototype.getState = function (prop) {
        return prop ? lodash_1.get(this.state, prop) : this.state;
    };
    Model.prototype.reset = function (newState) {
        this.state = lodash_1.cloneDeep(newState);
        return this;
    };
    Model.prototype.equals = function (prop, value, exact) {
        return exact ? this.getState(prop) === value : this.getState(prop) == value;
    };
    Model.prototype.includes = function (prop, value, caseSensitive) {
        var currentValue = this.getState(prop);
        if (typeof currentValue !== 'string' && !(currentValue instanceof String)) {
            return false;
        }
        if (caseSensitive) {
            return !!~currentValue.indexOf(value);
        }
        else {
            return !!~currentValue.toLocaleLowerCase().indexOf(value.toLocaleLowerCase());
        }
    };
    Model.prototype.prepare = function (data) {
        return this.reset(Object.assign({}, stateDefaults(), data));
    };
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=Model.js.map