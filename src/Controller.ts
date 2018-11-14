import {get as _get} from 'lodash';
import {AnyAction} from 'redux';
import {Model} from './Model';

export interface IControllerActions {
  [name: string]: any;
}

interface Constructable<T> {
  new(state: object): T;
}

// Basic controller
export class Controller<T extends Model<object>> {
  // List of fields to get from global store
  // To get nested properties, it is necessary to specify them through a dot: routing.location
  public static connectedState: string[] = [];
  // actions that need to be wrapped by dispatcher
  public static actions: any = {};
  public static storeKey: string = '';
  public Model: Constructable<Model<object>>;
  public storeKey: string = '';
  public name: string = 'BasicController';

  public constructor(Model, props, context?) {
    this.Model = Model;
    this.storeKey = (<typeof Controller> this.constructor).storeKey;
  }

  public getGlobalState: () => void = () => {};
  public componentWillReceiveProps(): void {}
  public dispatch: <A extends AnyAction>(action: A) => A = (action) => action;

  /**
   * Use to connect to global store
   * @param {object} state - store properties that need to be connected
   * @returns {object}
   */
  public mappedProps(state: object): object {
    return (<typeof Controller> this.constructor).connectedState.reduce((result, prop) => {
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
   * dispatches actions
   * @param args
   * @returns {Promise<any>}
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
   * Starts with initialization for initial loading
   * ! Until it is done, the first render does not start
   * @returns {Promise<any>}
   */
  public onInit = (): Promise<any> => Promise.resolve();

  /**
   * Return connected state. Can be nested
   * @param {string} prop
   * @returns {any}
   */
  public getState = (prop?: string): any => {
    if (this.storeKey) {
      return prop ? _get(this.getGlobalState()[this.storeKey], prop) : this.getGlobalState()[this.storeKey];
    }
  }

  /**
   * Return waiting
   * @returns {object}
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

  /**
   * Return is this prop in waiting
   * @param prop
   * @returns {boolean}
   */
  public isWaiting(prop): boolean {
    if (this.Model) {
      return new this.Model(this.getState()).isWaiting(prop);
    }
    else {
      noModelWarning(this.name);
      return false;
    }
  }

  /**
   * Return is this prop is failed
   * @param prop
   * @returns {boolean}
   */
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
   * Return failed
   * @returns {object}
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
