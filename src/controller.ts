import {get as _get} from 'lodash';

export interface IControllerActions {
  [name: string]: (any);
}

// Базовый контроллер
export class Controller<T> {
  // список полей, которые надо получить из стора.
  // чтобы получить вложенные, надо указать их через точку: routing.location
  public static connectedState: string[] = [];
  // действия которые надо обернуть dispatch-ем
  public static actions: IControllerActions = {};

  public name: string;
  public getGlobalState: () => void;
  public componentWillReceiveProps: () => void;
  public storeKey: string | null = null;
  public Model: T;

  public constructor(Model: T, ...props) {
    this.Model = Model;
    // this.checkSettings();
    this.storeKey = this.constructor.storeKey;
    this.actions = this.constructor.actions;
  }

  /**
   * используется для коннекта к стору
   * @example ['currentContract', 'routing.location:location']
   * @param {[String]} state - свойства стора которые надо приконенктить
   * @returns {*}
   */
  public mappedProps(state) {
    return this.constructor.connectedState.reduce((result, prop) => {
      let key: string = prop;
      if (prop.includes(':')) {
        const parts: string[] = prop.split(':');
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
  public action(...args): Error {
    const [name, ...restArguments] = args;
    if (typeof name === 'function') {
      return this.dispatch(name.apply(undefined, restArguments));
    }
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
  public onInit = (): Promise<any> => Promise.resolve();

  /**
   * Возвращает connected state. Может быть вложенным.
   * @example getState('routing'); getState('routing.location')
   * @param {String} prop
   * @returns {undefined}
   */
  public getState(prop) {
    return prop ? _get(this.getGlobalState()[this.storeKey], prop) : this.getGlobalState()[this.storeKey];
  }

  /**
   * возвращает ожидающие
   * @returns {*}
   */
  public getWaiting() {
    if (this.Model) {
      return new this.Model(this.getState()).getWaiting();
    }
    else {
      noModelWarning(this.name);
    }
  }

  public isWaiting(prop): boolean | void {
    if (this.Model) {
      return !!new this.Model(this.getState()).isWaiting(prop);
    }
    else {
      noModelWarning(this.name);
    }
  }

  public isFailed(prop): boolean | void {
    if (this.Model) {
      return !!new this.Model(this.getState()).isFailed(prop);
    }
    else {
      noModelWarning(this.name);
    }
  }

  /**
   * возвращает ошибки
   * @returns {*}
   */
  public getFailed() {
    if (this.Model) {
      return new this.Model(this.getState()).getFailed();
    }
    else {
      noModelWarning(this.name);
    }

  }

  /**
   * проверяет, чтобы все необходимое было установлено
   */
  // TODO: непонятно, нужен ли этот метод
  private checkSettings(): Error | void {
    if (!this.constructor.storeKey) {
      throw new Error(`Store key in ${this.name} must be defined`);
    }
  }
}

Controller.prototype.name = 'BasicController';
// withController должен передать сюда реальный диспатчер
Controller.prototype.dispatch = function () {
};
Controller.prototype.getGlobalState = function () {
};
Controller.prototype.componentWillReceiveProps = function () {
};

function noModelWarning(controllerName: string): Error {
  throw new Error(`There is Model provided to ${controllerName}`);
}
