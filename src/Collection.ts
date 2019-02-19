import {Model} from './Model';
import {generateGuid} from './helpers';
import {TState} from './DataModel';

// Model interface
interface IModelData {
  [name: string]: any;
}

interface Constructable<Proto> {
  new (...args: any[]): Proto;
}

// Collection is class to work with Models with IModelData interface
export class Collection<T extends IModelData, O extends object = {}> {
  public models: Array<Model<T>> = [];
  public options?: O;

  public constructor(items: T[] = [], options?: O) {
    this.options = options;
    this._prepare(items);
    this.onInit();
    return this;
  }

  /**
   * Return array with clean models data
   * @returns {Array<TState<T extends IModelData>>}
   */
  public getState(): Array<TState<T>> {
    return this.models.map((model) => model.getState());
  }

  /**
   * Return last model of collection
   * @returns {Model<T extends IModelData>}
   */
  public last(): Model<T> {
    return this.models[this.size() - 1];
  }

  /**
   * Return first model of collection
   * @returns {Model<T extends IModelData>}
   */
  public first(): Model<T> {
    return this.models[0];
  }

  /**
   * Return model which property prop is value
   * @param {string} prop
   * @param value
   * @returns {Model<T extends IModelData> | undefined}
   */
  public find(prop: string, value: any): Model<T> | undefined {
    return this.models.find(model => model.equals(prop, value));
  }

  /**
   * Return all models which property prop is value
   * @param {string} prop
   * @param value
   * @returns {Array<Model<T extends IModelData>>}
   */
  public filter(prop: string, value: any): Array<Model<T>> {
    return this.models.filter(model => model.equals(prop, value));
  }

  /**
   * Return first model which property prop includes value
   * @param {string} prop
   * @param {string} value
   * @returns {Model<T extends IModelData> | undefined}
   */
  public findIncludes(prop: string, value: string): Model<T> | undefined {
    return this.models.find(model => model.includes(prop, value));
  }

  /**
   * Return all models which property prop includes value
   * @param {string} prop
   * @param value
   * @returns {Array<Model<T extends IModelData>>}
   */
  public filterIncludes(prop: string, value: any): Array<Model<T>> {
    return this.models.filter(model => model.includes(prop, value));
  }

  /**
   * Return index of the model with prop equals value
   * @param {string} prop
   * @param value
   * @returns {number}
   */
  public findIndex(prop: string, value: any): number {
    return this.models.findIndex(model => model.equals(prop, value));
  }

  /**
   * Return model by index in the collection
   * @param {number} index
   * @returns {Model<T extends IModelData> | undefined}
   */
  public findByIndex(index: number): Model<T> | undefined {
    return this.models[index];
  }

  /**
   * Remove model from the collection
   * @param {Model<T extends IModelData>} model
   * @returns {this}
   */
  public remove(model: Model<T>): this {
    const index = this.findIndex('_id', model.getState('_id'));
    this.models.splice(index, 1);
    return this;
  }

  /**
   * Reverse models in the collection
   * @returns {Array<Model<T extends IModelData>>}
   */
  public reverse(): Array<Model<T>> {
    return this.models.reverse();
  }

  /**
   * Check if collection is empty
   * @returns {boolean}
   */
  public isEmpty(): boolean {
    return !this.size();
  }

  /**
   * Return models count
   * @returns {number}
   */
  public size(): number {
    return this.models.length;
  }

  /**
   * Insert model in collection
   * @param {Model<T extends IModelData> | T} data - If data not is instance of Model, then adding new instance of Model
   * @param {number} index - Position to insert
   * @returns {Model<T extends IModelData>}
   */
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
    }
    return newModel;
  }

  /**
   * This method is necessary for initializing
   * @returns {this}
   */
  protected onInit(): this {
    return this;
  }

  /**
   * This method is recommended for overriding model instantiating
   * @param ModelProto
   * @param data
   */
  protected createModel(ModelProto: Constructable<Model<T>>, data: T): Model<T> {
    return new ModelProto(data);
  }

  /**
   * Creates array of models
   * @param {T[]} items - Instance of Model
   * @private
   */
  private _prepare(items: T[]): void {
    items.forEach(item => {
      item._id = item._id || generateGuid();
      const modelInstance = this.createModel(Model, item);
      this.models.push(modelInstance);
    });
  }

  // todo sort
}
