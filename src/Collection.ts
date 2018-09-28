import {Model, IDefaultModelOptions, TState} from './Model';
import {generateGuid} from './helpers';

interface IModelData {
  [name: string]: any;
}

export class Collection<T extends IModelData> {
  public models: Model<T>[]  = [];

  public constructor(items: T[] = [], options: IDefaultModelOptions = {}) {
    this._prepare(items, options);
    this.onInit();
    return this;
  }

  public onInit(): this {
    return this;
  }

  /**
   * возвращает массив со стейтами моделей
   * @returns {*}
   */
  public getState(): TState<IModelData>[] {
    return this.models.map((model) => model.getState());
  }

  public last(): Model<T> {
    return this.models[this.size() - 1];
  }

  public first(): Model<T> {
    return this.models[0];
  }

  public find(prop: string, value: any): Model<T> | undefined {
    return this.models.find(model => model.getState().equals(prop, value));
  }

  public filter(prop: string, value: any): Model<T>[] {
    return this.models.filter(model => model.getState().equals(prop, value));
  }

  /**
   * возвращает первую модель у которой свойство prop содержит значение value
   * @param {String} prop
   * @param {String} value
   * @returns {Model}
   */
  public findIncludes(prop: string, value: any): Model<T> | undefined {
    return this.models.find(model => model.includes(prop, value));
  }

  /**
   * возвращает модели у которых свойство prop содержит значение value
   * @param {String} prop
   * @param {String} value
   * @returns {Array <Model>}
   */
  public filterIncludes(prop: string, value: any): Model<T>[] {
    return this.models.filter(model => model.includes(prop, value));
  }

  public findIndex(prop: string, value: any): number {
    return this.models.findIndex(model => model.equals(prop, value));
  }

  public findByIndex(index: number): Model<T> | undefined {
    return this.models[index];
  }

  public remove(model: Model<T>): this {
    const index = this.findIndex('_id', model.getState('_id'));
    this.models.splice(index, 1);
    return this;
  }

  public reverse(): Model<T>[] {
    return this.models.reverse();
  }

  public isEmpty(): boolean {
    return !this.size();
  }

  public size(): number {
    return this.models.length;
  }

  public insert(data: Model<T> | T, index?: number): Model<T> {
    let newModel: Model<T>;
    if (data instanceof Model) {
      newModel = data;
    }
    else {
      newModel = new Model(data);
    }
    if (index !== undefined) {
      this.models.splice(index, 0, newModel);
    }
    else {
      this.models.push(newModel);
      console.log(123);
    }
    return newModel;
  }

  private _prepare(items: T[], options?: IDefaultModelOptions): void {
    items.forEach(item => {
      item._id = item._id || generateGuid();
      this.models.push(new Model(item, options));
    });
  }

  // todo sort
}
