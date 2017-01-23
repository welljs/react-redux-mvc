import {PropTypes} from 'react';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isPlainObject from 'lodash/isPlainObject';
import cloneDeep from 'lodash/cloneDeep';
import {merge} from './helpers';

class Model {
    state = {
        __waiting: {},
        __failed: {}
    };

    _prepare (data) {
        this.reset(data);
    }
    onInit() {
        return this;
    }

    constructor (props, options = {}) {
        this.options = options;
        this._prepare(props);
        this._createShape();
        this.onInit();
    }

    setWaiting (prop) {
        this.set('__waiting.' + prop, true);
        return this;
    }

    resetWaiting (prop) {
        this.set('__waiting.' + prop, false);
        return this;
    }

    setFailed (prop) {
        this.set('__failed.' + prop, true);
        return this;
    }

    resetFailed (prop) {
        this.set('__failed.' + prop, false);
        return this;
    }

    isWaiting (key) {
        return !!this.getState('__waiting.' + key);
    }

    isFailed (key) {
        return !!this.getState('__failed.' + key);
    }

    getWaiting () {
        return this.getState('__waiting');
    }

    getFailed () {
        return this.getState('__failed');
    }

    _createShape () {
        const {object} = PropTypes;
        this.constructor.shape = Object.assign({
            ...(this.constructor.shape || {}),
            __waiting: object.isRequired,
            __failed: object.isRequired
        });
    }

    /**
     * устанавливает значение prop в value
     * @param {String|Object} prop
     * @param value
     */
    set (prop, value) {
        if (!prop) {
            throw Error('Property must be set');
        }
        //устанавливает значения для целого объекта
        if (_isPlainObject(prop)) {
            const key = Object.keys(prop)[0];
            const piece = this.getState(key);
            //для вложенных свойств
            if (key && !!~key.indexOf('.') && piece && !!prop[key]) {
                _set(this.state, key, merge(cloneDeep(piece), prop[key]));
            }
            else {
                this.state = merge(cloneDeep(this.state), prop);
            }
        }
        else if (typeof prop === 'string' && value !== undefined) {
            //позволяет устанавливать значения для вложенных ключей. Нармер set('user.name','Ivan')
            _set(this.state, prop, value);
        }
        return this;
    }

    update(updates) {
        this.set(updates);
        return this;
    }

    getState (prop) {
        return prop ? _get(this.state, prop) : this.state;
    }

    reset (newState) {
        this.state = cloneDeep(newState);
        return this;
    }

    equals (prop, value, exact = false) {
        return exact ? this.getState(prop) === value : this.getState(prop) == value;
    }
}

export default Model;