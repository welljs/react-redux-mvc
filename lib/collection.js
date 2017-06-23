'use strict';exports.__esModule = true;var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _class, _temp;var _model = require('./model');var _model2 = _interopRequireDefault(_model);
var _helpers = require('./helpers');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var
Collection = (_temp = _class = function () {


    function Collection() {var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};(0, _classCallCheck3.default)(this, Collection);this.models = [];
        this.options = options;
        this._prepare(items, this.constructor.Model);
        this.onInit();
        return this;
    }Collection.prototype.

    onInit = function onInit() {
        return this;
    };Collection.prototype.

    _prepare = function _prepare(items, Model) {var _this = this;
        items.forEach(function (item) {
            item._id = item._id || (0, _helpers.generateGuid)();
            _this.models.push(new Model(item));
        });
    };

    /**
        * возвращает массив со стейтами моделей
        * @returns {*}
        */Collection.prototype.
    getState = function getState() {
        return this.models.reduce(function (res, model) {return res.push(model.getState()), res;}, []);
    };Collection.prototype.

    last = function last() {
        return this.models[this.size()];
    };Collection.prototype.

    first = function first() {
        return this.models[0];
    };Collection.prototype.

    find = function find(prop, value) {
        return this.models.find(function (model) {return model.equals(prop, value);});
    };Collection.prototype.

    filter = function filter(prop, value) {
        return this.models.filter(function (model) {return model.equals(prop, value);});
    };

    /**
        * возвращает первую модель у которой свойство prop содержит значение value
        * @param {String} prop
        * @param {String} value
        * @returns {Model}
        */Collection.prototype.
    findIncludes = function findIncludes(prop, value) {
        return this.models.find(function (model) {return model.includes(prop, value);});
    };

    /**
        * возвращает модели у которых свойство prop содержит значение value
        * @param {String} prop
        * @param {String} value
        * @returns {Array <Model>}
        */Collection.prototype.
    filterIncludes = function filterIncludes(prop, value) {
        return this.models.filter(function (model) {return model.includes(prop, value);});
    };Collection.prototype.

    findIndex = function findIndex(prop, value) {
        return this.models.findIndex(function (model) {return model.equals(prop, value);});
    };Collection.prototype.

    findByIndex = function findByIndex(index) {
        return this.models[index];
    };Collection.prototype.

    remove = function remove(model) {
        var index = this.findIndex('_id', model.getState('_id'));
        this.models.splice(index, 1);
        return this;
    };Collection.prototype.

    reverse = function reverse() {
        return this.models.reverse();
    };Collection.prototype.

    isEmpty = function isEmpty() {
        return !this.size();
    };Collection.prototype.

    size = function size() {
        return this.models.length;
    };Collection.prototype.

    insert = function insert(data, index) {
        if (index) {
            this.models.splice(index, 0, new this.constructor.Model(data));
        } else
        {
            this.models.push(new this.constructor.Model(data));
        }
    };Collection.prototype.

    add = function add(data) {
        this.models.push(new this.constructor.Model(data));
    };

    //todo sort
    return Collection;}(), _class.Model = _model2.default, _temp);exports.default =

Collection;module.exports = exports['default'];