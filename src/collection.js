import DefaultModel from './model';
class Collection {
    models = [];
    static Model = DefaultModel;
    constructor (items = []) {
        this._prepare(items, this.constructor.Model);
        return this;
    }

    _prepare (items, Model) {
        items.forEach(item => this.models.push(new Model(item)));
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
        return this.model[index];
    }

    remove (model) {
        const index = this.findIndex('Id', model.getState('Id'));
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
        return this.model.lenght;
    }

    //todo sort
}

export default Collection;