import {DataModel} from './DataModel';

export interface IDefaultModelState {
  __waiting: object;
  __failed: object;
}

const stateDefaults = (): IDefaultModelState => ({
  __waiting: {},
  __failed: {},
});

// Basic Model
export class Model<T extends object, O extends object = {}> extends DataModel<T & IDefaultModelState, O>{
  public constructor(props: T, options?: O) {
    super(Object.assign({}, stateDefaults(), props), options);
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
    return this.getState('__waiting');
  }

  /**
   * Return failed
   * @returns {object}
   */
  public getFailed(): object {
    return this.getState('__failed');
  }
}
