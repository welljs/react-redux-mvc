import {get as _get, set as _set, isPlainObject, cloneDeep} from 'lodash';
import {merge} from './helpers';
import MVC from 'react-redux-mvc';

const stateDefaults = () => ({
  __waiting: {},
  __failed: {}
});

class Model<MData extends object, MOptions> implements MVC.Model<MData, MOptions> {
  public state: MVC.TState<MData>;
  public options: MVC.TModelOptions<MOptions>;
  constructor(props: MData, options: MVC.TModelOptions<MOptions>) {
    this.options = options;
    this.prepare(props);
    this.onInit();
    return this;
  }

  public onInit(): this {
    return this;
  }

  public setWaiting(prop): this {
    return this.set('__waiting.' + prop, true);
  }

  public resetWaiting(prop): this {
    return this.set('__waiting.' + prop, false);
  }

  public setFailed(prop): this {
    return this.set('__failed.' + prop, true);
  }

  public resetFailed(prop): this {
    return this.set('__failed.' + prop, false);
  }

  public isWaiting(key): boolean {
    return !!this.getState('__waiting.' + key);
  }

  public isFailed(key) {
    return !!this.getState('__failed.' + key);
  }

  public getWaiting(): MVC.TState<MData> {
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
  public set(prop: string | object, value?: any) {
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

  public update(updates: object): this {
    this.set(updates);
    return this;
  }

  public getState(prop?: string): MVC.TState<MData> {
    return this.state;
  }

  public reset(newState: MVC.TState<MData>): this {
    this.state = cloneDeep(newState);
    return this;
  }

  public equals(prop: string, value: any, exact = false) {
    return exact ? this.getState(prop) === value : this.getState(prop) == value;
  }

  public includes(prop: string, value: string, caseSensitive = false) {
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

  private prepare(data: MData): this {
    return this.reset(Object.assign({}, stateDefaults(), data));
  }
}

export default Model;
