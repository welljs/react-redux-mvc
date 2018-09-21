import * as DefaultModel from './Model';
export declare class Collection<M extends DefaultModel.Model<any>> {
    static Model: typeof DefaultModel.Model;
    models: M[];
    options: DefaultModel.IDefaultModelOptions;
    constructor(items?: any[], options?: {});
    onInit(): this;
    getState(): M[];
    last(): M;
    first(): M;
    find(prop: string, value: any): M | undefined;
    filter(prop: string, value: any): M[];
    findIncludes(prop: string, value: any): M | undefined;
    filterIncludes(prop: string, value: any): M[];
    findIndex(prop: string, value: any): number;
    findByIndex(index: number): M;
    remove(model: M): this;
    reverse(): M[];
    isEmpty(): boolean;
    size(): number;
    insert(data: M | DefaultModel.Model<M>, index: number): DefaultModel.Model<M>;
    add(data: M | DefaultModel.Model<M>): DefaultModel.Model<M>;
    private _prepare;
    private _modelProto;
}
