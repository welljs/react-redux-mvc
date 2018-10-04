import {get as _get} from 'lodash';
import {AnyAction} from 'redux';
import {Model} from './Model';

export interface IControllerActions {
  [name: string]: any;
}

interface Constructable<T> {
  new(state: object): T;
}

// Базовый контроллер
export class Controller<T extends Model<object>> {
  // список полей, которые надо получить из стора.
  // чтобы получить вложенные, надо указать их через точку: routing.location
  public static connectedState: string[] = [];
  // действия которые надо обернуть dispatch-ем
  public static actions: any = {};
  public storeKey: string = '';
  public static storeKey: string = '';
  public name: string = 'BasicController';
  public getGlobalState: () => void = () => {};
  public componentWillReceiveProps(currentProps: T, nextProps: T): void {};
  public dispatch: <A extends AnyAction>(action: A) =>A = (action) => {return action};
  public Model: Constructable<Model<object>>;

  public constructor(Model, props, context?) {
    this.Model = Model;
    this.storeKey = (<typeof Controller>this.constructor).storeKey;
  }

  /**
   * используется для коннекта к стору
   * @example ['currentContract', 'routing.location:location']
   * @param {[String]} state - свойства стора которые надо приконенктить
   * @returns {*}
   */
  public mappedProps(state: object): object {
    return (<typeof Controller>this.constructor).connectedState.reduce((result, prop) => {
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
  public action(...args): Promise<any> {
    const [name, ...restArguments] = args;
    if (typeof name === 'function') {
      return this.dispatch(name.apply(undefined, restArguments));
    }
    const action = Controller.actions[name];
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
  public getState = (prop?: string): any => {
    if (this.storeKey) {
      return prop ? _get(this.getGlobalState()[this.storeKey], prop) : this.getGlobalState()[this.storeKey];
    }
  }

  /**
   * возвращает ожидающие
   * @returns {*}
   */
  public getWaiting(): object {
    if (this.Model) {
      return new this.Model(this.getState()).getWaiting();
    }
    else {
      noModelWarning(this.name);
      return {};
    }
  }

  public isWaiting(prop): boolean {
    if (this.Model) {
      return new this.Model(this.getState()).isWaiting(prop)
    }
    else {
      noModelWarning(this.name);
      return false;
    }
  }

  public isFailed(prop): boolean {
    if (this.Model) {
      return new this.Model(this.getState()).isFailed(prop);
    }
    else {
      noModelWarning(this.name);
      return false;
    }
  }

  /**
   * возвращает ошибки
   * @returns {*}
   */
  public getFailed(): object {
    if (this.Model) {
      return new this.Model(this.getState()).getFailed();
    }
    else {
      noModelWarning(this.name);
      return {};
    }
  }
}

function noModelWarning(controllerName: string): void {
  throw new Error(`There is Model provided to ${controllerName}`);
}
