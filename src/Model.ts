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

export class Model<T extends object> {
  public state: TState<T>;
  public options?: IDefaultModelOptions;

  public constructor(props: T, options?: IDefaultModelOptions) {
    this.options = options || {};
    this.prepare(props);
    this.onInit();
    return this;
  }

  public onInit(): this {
    return this;
  }

  public setWaiting(prop: string | any): this {
    return this.set('__waiting.' + prop, true);
  }

  public resetWaiting(prop: string | any): this {
    return this.set('__waiting.' + prop, false);
  }

  public setFailed(prop: string | any): this {
    return this.set('__failed.' + prop, true);
  }

  public resetFailed(prop: string | any): this {
    return this.set('__failed.' + prop, false);
  }

  public isWaiting(key: string): boolean {
    return !!this.getState('__waiting.' + key);
  }

  public isFailed(key: any): boolean {
    return !!this.getState('__failed.' + key);
  }

  public getWaiting(): object {
    return this.getState().__waiting;
  }

  public getFailed(): object {
    return this.getState('__failed');
  }

  /**
   * устанавливает значение prop в value
   * @param {String|Object} prop
   * @param value
   */
  public set(prop: string | object, value?: any): this {
    if (!prop) {
      throw Error('Property must be set');
    }
    // устанавливает значения для целого объекта
    if (isPlainObject(prop)) {
      const key = Object.keys(prop)[0];
      const piece = this.getState(key);
      // для вложенных свойств
      if (key && !!~key.indexOf('.') && piece && !!prop[key]) {
        _set(this.state, key, merge(cloneDeep(piece), prop[key]));
      }
      else {
        this.state = merge(cloneDeep(this.state), prop);
      }
    }
    else if (typeof prop === 'string' && value !== undefined) {
      // позволяет устанавливать значения для вложенных ключей. Нармер set('user.name','Ivan')
      _set(this.state, prop, value);
    }
    return this;
  }

  public update(updates: Partial<T> | object): this {
    this.set(updates);
    return this;
  }

  public getState(prop?: string): TState<T> {
    return prop ? _get(this.state, prop) : this.state;
  }

  public reset(newState: TState<T>): this {
    this.state = cloneDeep(newState);
    return this;
  }

  public equals(prop: string, value: any, exact?: boolean): boolean {
    return exact ? this.getState(prop) === value : this.getState(prop) == value;
  }

  public includes(prop: string, value: string, caseSensitive?: boolean): boolean {
    const currentValue = this.getState(prop);
    if (typeof currentValue !== 'string' && !(currentValue instanceof String) ) {
      throw Error('value should be a string type');
    }
    if (caseSensitive) {
      return !!~currentValue.indexOf(value);
    }
    else {
      return !!~currentValue.toLocaleLowerCase().indexOf(value.toLocaleLowerCase());
    }
  }

  private prepare(data: T): this {
    return this.reset(Object.assign({}, stateDefaults(), data));
  }
}
