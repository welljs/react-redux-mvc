import * as DefaultModel from './Model';
import {generateGuid} from './helpers';

export class Collection<M extends DefaultModel.Model<any>> {
  public static Model = DefaultModel.Model;
  public models: M[]  = [];
  public options: DefaultModel.IDefaultModelOptions = {};

  public constructor(items: any[] = [], options = {}) {
    this.options = options;
    this._prepare(items, this.constructor.Model);
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
  public getState(): M[] {
    return this.models.reduce((res, model) => (res.push(model.getState()), res), []);
  }

  public last(): M {
    return this.models[this.size()];
  }

  public first(): M {
    return this.models[0];
  }

  public find(prop: string, value: any): M | undefined {
    return this.models.find(model => model.equals(prop, value));
  }

  public filter(prop: string, value: any): M[] {
    return this.models.filter(model => model.equals(prop, value));
  }

  /**
   * возвращает первую модель у которой свойство prop содержит значение value
   * @param {String} prop
   * @param {String} value
   * @returns {Model}
   */
  public findIncludes(prop: string, value: any): M | undefined {
    return this.models.find(model => model.includes(prop, value));
  }

  /**
   * возвращает модели у которых свойство prop содержит значение value
   * @param {String} prop
   * @param {String} value
   * @returns {Array <Model>}
   */
  public filterIncludes(prop: string, value: any): M[] {
    return this.models.filter(model => model.includes(prop, value));
  }

  public findIndex(prop: string, value: any): number {
    return this.models.findIndex(model => model.equals(prop, value));
  }

  public findByIndex(index: number): M {
    return this.models[index];
  }

  public remove(model: M): this {
    const index = this.findIndex('_id', model.getState('_id'));
    this.models.splice(index, 1);
    return this;
  }

  public reverse(): M[] {
    return this.models.reverse();
  }

  public isEmpty(): boolean {
    return !this.size();
  }

  public size(): number {
    return this.models.length;
  }

  public insert(data: M | DefaultModel.Model<M>, index: number): DefaultModel.Model<M> {
    const Model = this._modelProto();
    let newModel;

    if (data instanceof Model) {
      newModel = data;
    }
    else {
      newModel = new Model(data);
    }

    if (index) {
      this.models.splice(index, 0, newModel);
    }
    else {
      this.models.push(newModel);
    }
    return newModel;
  }

  public add(data: M | DefaultModel.Model<M>): DefaultModel.Model<M> {
    const Model = this._modelProto();
    let newModel;
    if (data instanceof Model) {
      newModel = data;
    }
    else {
      newModel = new Model(data);
    }
    this.models.push(newModel);
    return newModel;
  }

  private _prepare(items: any[], Model: M) {
    items.forEach(item => {
      item._id = item._id || generateGuid();
      this.models.push(new DefaultModel.Model(item));
    });
  }

  private _modelProto() {
    return this.constructor.Model;
  }

  // todo sort
}
