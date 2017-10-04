declare module 'react-redux-mvc' {
  namespace MVC {
    interface IDefaultState {
      __waiting: object;
      __failed: object;
      _id?: string;
    }

    type TPartialState <T> = {
      [P in keyof T] : T[P]
    };

    type TState<T> = T & IDefaultState;

    interface IControllerActions {
      [name: string]: (any);
    }

    interface IDefaultModelOptions {
      action: string | undefined;
    }

    type TModelOptions<T> = T & IDefaultModelOptions;

    class Model<MData extends object, MOptions>{
      public state: TState<MData>;
      public options: TModelOptions<MOptions>;
      constructor(data?: MData, options?: object);
      public onInit(): this;
      public update(updates: any): this;
      public set(prop: string | any, value: any): this;
      public set(value: object): this;
      public setWaiting(prop: string | any): this;
      public isWaiting(key: string): boolean;
      public setFailed(prop: string | any): this;
      public isFailed(key: any): boolean;
      public resetFailed(prop: string | any): this;
      public getState(prop: string): MVC.TPartialState<MVC.TState<MData>> | MVC.TState<MData>;
      // public getState(): TState<MData>;
      public getWaiting(action: string): boolean;
      public getWaiting(): MVC.TState<MData>;
      public reset(newState: MVC.TState<MData>): this;
    }

    class Collection<M extends Model<any, any>> {
      public static Model;
      public models: M[];
      constructor(items?: any[], options?: any);
      public onInit(): Collection<M>;
      public getState(): any[];
      public last(): M;
      public first(): M;
      public find(prop: string, value: any): M;
      public filter(prop: string, value: any): M[];
      public findIncludes(prop: string, value: any): M;
      public filterIncludes(prop: string, value: any): M[];
      public findIndex(prop: string, value): number;
      public findByIndex(index: number): M;
      public remove(model: M): this;
      public reverse(): this;
      public isEmpty(): boolean;
      public size(): number;
      public insert(data: M | Model<M>, index: number): Model<M>;
      public add(data: M | Model<M>): Model<M>;
    }

    function withController(Controller: any): any;

    class Controller<T> {
      public static actions: IControllerActions;
      public Model: any;
      public storeKey: string;
      constructor(model: T, props?: object, context?: object);
      public action(action: () => any, ...args: any[]);
      public getGlobalState(): object;
    }
  }
  export default MVC;
}
