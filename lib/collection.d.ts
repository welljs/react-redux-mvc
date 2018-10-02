import { Model, IDefaultModelOptions, TState } from './Model';
interface IModelData {
    [name: string]: any;
}
export declare class Collection<T extends IModelData> {
    models: Model<T>[];
    constructor(items?: T[], options?: IDefaultModelOptions);
    onInit(): this;
    getState(): TState<T>[];
    last(): Model<T>;
    first(): Model<T>;
    find(prop: string, value: any): Model<T> | undefined;
    filter(prop: string, value: any): Model<T>[];
    findIncludes(prop: string, value: any): Model<T> | undefined;
    filterIncludes(prop: string, value: any): Model<T>[];
    findIndex(prop: string, value: any): number;
    findByIndex(index: number): Model<T> | undefined;
    remove(model: Model<T>): this;
    reverse(): Model<T>[];
    isEmpty(): boolean;
    size(): number;
    insert(data: Model<T> | T, index?: number): Model<T>;
    private _prepare;
}
export {};
