"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("./Model");
var helpers_1 = require("./helpers");
var Collection = (function () {
    function Collection(items, options) {
        if (items === void 0) { items = []; }
        if (options === void 0) { options = {}; }
        this.models = [];
        this._prepare(items, options);
        this.onInit();
        return this;
    }
    Collection.prototype.onInit = function () {
        return this;
    };
    Collection.prototype.getState = function () {
        return this.models.map(function (model) { return model.getState(); });
    };
    Collection.prototype.last = function () {
        return this.models[this.size() - 1];
    };
    Collection.prototype.first = function () {
        return this.models[0];
    };
    Collection.prototype.find = function (prop, value) {
        return this.models.find(function (model) { return model.equals(prop, value); });
    };
    Collection.prototype.filter = function (prop, value) {
        return this.models.filter(function (model) { return model.equals(prop, value); });
    };
    Collection.prototype.findIncludes = function (prop, value) {
        return this.models.find(function (model) { return model.includes(prop, value); });
    };
    Collection.prototype.filterIncludes = function (prop, value) {
        return this.models.filter(function (model) { return model.includes(prop, value); });
    };
    Collection.prototype.findIndex = function (prop, value) {
        return this.models.findIndex(function (model) { return model.equals(prop, value); });
    };
    Collection.prototype.findByIndex = function (index) {
        return this.models[index];
    };
    Collection.prototype.remove = function (model) {
        var index = this.findIndex('_id', model.getState('_id'));
        this.models.splice(index, 1);
        return this;
    };
    Collection.prototype.reverse = function () {
        return this.models.reverse();
    };
    Collection.prototype.isEmpty = function () {
        return !this.size();
    };
    Collection.prototype.size = function () {
        return this.models.length;
    };
    Collection.prototype.insert = function (data, index) {
        var newModel;
        if (data instanceof Model_1.Model) {
            newModel = data;
        }
        else {
            newModel = new Model_1.Model(data);
        }
        if (index !== undefined) {
            this.models.splice(index, 0, newModel);
        }
        else {
            this.models.push(newModel);
        }
        return newModel;
    };
    Collection.prototype._prepare = function (items, options) {
        var _this = this;
        items.forEach(function (item) {
            item._id = item._id || helpers_1.generateGuid();
            _this.models.push(new Model_1.Model(item, options));
        });
    };
    return Collection;
}());
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map