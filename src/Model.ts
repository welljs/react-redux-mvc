import {set as _set, isPlainObject, cloneDeep, get as _get} from 'lodash';
import {merge} from './helpers';

export interface IDefaultState {
  __waiting: object;
  __failed: object;
  _id?: string;
}

export type TState<T> = T & IDefaultState;

export interface IDefaultModelOptions {
  action?: string;
}

const stateDefaults = (): IDefaultState => ({
  __waiting: {},
  __failed: {},
});

// Basic Model
export class Model<T extends object> {
  public state: TState<T>;
  public options?: IDefaultModelOptions;

  public constructor(props: T, options?: IDefaultModelOptions) {
    this.options = options || {};
    this.prepare(props);
    this.onInit();
    return this;
  }

  /**
   * This method is necessary for initializing
   * @returns {this}
   */
  public onInit(): this {
    return this;
  }

  /**
   * Adding prop to waiting
   * @param {string | any} prop
   * @returns {this}
   */
  public setWaiting(prop: string | any): this {
    return this.set('__waiting.' + prop, true);
  }

  /**
   * Reset waiting of prop
   * @param {string | any} prop
   * @returns {this}
   */
  public resetWaiting(prop: string | any): this {
    return this.set('__waiting.' + prop, false);
  }

  /**
   * Adding prop to failed
   * @param {string | any} prop
   * @returns {this}
   */
  public setFailed(prop: string | any): this {
    return this.set('__failed.' + prop, true);
  }

  /**
   * Reset failed of prop
   * @param {string | any} prop
   * @returns {this}
   */
  public resetFailed(prop: string | any): this {
    return this.set('__failed.' + prop, false);
  }

  /**
   * Return is this props in waiting
   * @param {string} key
   * @returns {boolean}
   */
  public isWaiting(key: string): boolean {
    return !!this.getState('__waiting.' + key);
  }

  /**
   * Return is this props in failed
   * @param key
   * @returns {boolean}
   */
  public isFailed(key: any): boolean {
    return !!this.getState('__failed.' + key);
  }

  /**
   * Return waiting
   * @returns {object}
   */
  public getWaiting(): object {
    return this.getState().__waiting;
  }

  /**
   * Return failed
   * @returns {object}
   */
  public getFailed(): object {
    return this.getState('__failed');
  }

  /**
   * Set prop value to value and return updated Model
   * @param {string | object} prop
   * @param value
   * @returns {this}
   */
  public set(prop: string | object, value?: any): this {
    if (!prop) {
      throw Error('Property must be set');
    }
    // sets value to whole object
    if (isPlainObject(prop)) {
      const key = Object.keys(prop)[0];
      const piece = this.getState(key);
      // for nested properties
      if (key && !!~key.indexOf('.') && piece && !!prop[key]) {
        _set(this.state, key, merge(cloneDeep(piece), prop[key]));
      }
      else {
        this.state = merge(cloneDeep(this.state), prop);
      }
    }
    else if (typeof prop === 'string' && value !== undefined) {
      // Allows to set values for nested keys. Example: set('user.name', 'Benedict')
      _set(this.state, prop, value);
    }
    return this;
  }

  /**
   * Return updated Model
   * @param {Partial<T extends object> | object} updates
   * @returns {this}
   */
  public update(updates: Partial<T> | object): this {
    this.set(updates);
    return this;
  }

  /**
   * Return Model state
   * @param {string} prop
   * @returns {TState<T extends object>}
   */
  public getState(prop?: string): TState<T> {
    return prop ? _get(this.state, prop) : this.state;
  }

  /**
   * Reset Model to newState and return it
   * @param {TState<T extends object>} newState
   * @returns {this}
   */
  public reset(newState: TState<T>): this {
    this.state = cloneDeep(newState);
    return this;
  }

  /**
   * Return is Model state contain equal prop: value
   * @param {string} prop
   * @param value
   * @param {boolean} exact
   * @returns {boolean}
   */
  public equals(prop: string, value: any, exact?: boolean): boolean {
    return exact ? this.getState(prop) === value : this.getState(prop) == value;
  }

  /**
   * Return is prop in Model state includes value
   * @param {string} prop
   * @param {string} value
   * @param {boolean} caseSensitive
   * @returns {boolean}
   */
  public includes(prop: string, value: string, caseSensitive?: boolean): boolean {
    const currentValue = this.getState(prop);
    if (typeof currentValue !== 'string' && !(currentValue instanceof String) ) {
      return false;
    }
    if (caseSensitive) {
      return !!~currentValue.indexOf(value);
    }
    else {
      return !!~currentValue.toLocaleLowerCase().indexOf(value.toLocaleLowerCase());
    }
  }

  /**
   * Creating Model
   * @param {T} data
   * @returns {this}
   */
  private prepare(data: T): this {
    return this.reset(Object.assign({}, stateDefaults(), data));
  }
}
