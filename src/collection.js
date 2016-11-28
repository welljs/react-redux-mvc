import DefaultModel from './model';
import {generateGuid} from './helpers';
class Collection {
    models = [];
    static Model = DefaultModel;
    constructor (items = [], options = {}) {
        this.options = options;
        this._prepare(items, this.constructor.Model);
        return this;
    }

    _prepare (items, Model) {
        items.forEach(item => {
            item._id = item._id || generateGuid();
            this.models.push(new Model(item));
        });
    }

    /**
     * возвращает массив со стейтами моделей
     * @returns {*}
     */
    getState() {
        return this.models.reduce((res, model) => (res.push(model.getState()), res), []);
    }

    last () {
        return [...this.models].pop();
    }

    first () {
        return this.models[0];
    }

    find (prop, value) {
        return this.models.find(model => model.equals(prop, value));
    }

    findIndex (prop, value) {
        return this.models.findIndex(model => model.equals(prop, value));
    }

    findByIndex (index) {
        return this.models[index];
    }

    remove (model) {
        const index = this.findIndex('_id', model.getState('_id'));
        this.models.splice(index, 1);
        return this;
    }

    reverse () {
        return this.models.reverse();
    }

    isEmpty () {
        return !this.size();
    }

    size () {
        return this.models.length;
    }

    insert (data, index) {
        if (index) {
            this.models.splice(index, 0, new this.constructor.Model(data));
        }
        else {
            this.models.push(new this.constructor.Model(data));
        }
    }

    add (data) {
        this.models.push(new this.constructor.Model(data));
    }

    //todo sort
}

export default Collection;