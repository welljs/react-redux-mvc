import {PropTypes} from 'react';
import _get from 'lodash/get';

//Базовый контроллер
export default class Controller {
    storeKey = null;
    static propsTypes = {};
    //список полей, которые надо получить из стора.
    // чтобы получить вложенные, надо указать их через точку: routing.location
    static connectedState = [];
    //действия которые надо обернуть dispatch-ем
    static actions = {};
    constructor (Model, ...props) {
        this.Model = Model;
        this.checkSettings();
        this.storeKey = this.constructor.storeKey;
        this.actions = this.constructor.actions;
        this.propTypes = this.constructor.propTypes
    }

    /**
     * проверяет, чтобы все необходимое было установлено
     */
    checkSettings () {
        if (!this.constructor.storeKey) {
            throw new Error(`Store key in ${this.name} must be defined`);
        }

        if (!this.Model) {
            throw new Error(`Model proto in ${this.name} must be passed to BasicController defined`);
        }
    }

    /**
     * используется для коннекта к стору
     * @example ['currentContract', 'routing.location:location']
     * @param {[String]} state - свойства стора которые надо приконенктить
     * @returns {*}
     */
    mappedProps(state) {
        return this.constructor.connectedState.reduce((result, prop) => {
            let key = prop;
            if (prop.includes(':')) {
                const parts = prop.split(':');
                prop = parts[0];
                key = parts[1];
            }
            return (result[key] = _get(state, prop), result);
        }, {});
    }

    /**
     * диспатчит действие
     * @param args
     */
    action (...args) {
        const [name, ...restArguments] = args;
        const action = this.actions[name];
        if (typeof action !== 'function') {
            throw Error('Action must be a function');
        }
        return this.dispatch(action.apply(undefined, restArguments));
    }

    /**
     * запсускается при инициализации, для первоначальных загрузок.
     * ! Пока не выполнится, не происходит первый рендер
     */
    onInit = () => Promise.resolve();

    /**
     * Возвращает connected state. Может быть вложенным.
     * @example getState('routing'); getState('routing.location')
     * @param {String} prop
     * @returns {undefined}
     */
    getState (prop) {
        return typeof prop === 'string' ? _get(this.getGlobalState(), prop) : undefined;
    };

    /**
     * возвращает ожидющие ключи
     * @param key
     */
    getWaiting (key) {
        return new this.Model(this.getState()).getWaiting();
    }

    /**
     * возвращает ошибки
     * @returns {*}
     */
    getFailed () {
        return this.model.update(this.getState()).getFailed();
    }
}

Controller.prototype.name = 'BasicController';
//withController должен передать сюда реальный диспатчер
Controller.prototype.dispatch = function () {};
Controller.prototype.getGlobalState = function () {};