export interface IDefaultState {
    __waiting: object;
    __failed: object;
    _id?: string;
}
export declare type TState<T> = T & IDefaultState;
export interface IDefaultModelOptions {
    action?: string;
}
export declare class Model<MData extends object> {
    state: TState<MData>;
    options?: IDefaultModelOptions;
    constructor(props: MData, options?: IDefaultModelOptions);
    onInit(): this;
    setWaiting(prop: string | any): this;
    resetWaiting(prop: string | any): this;
    setFailed(prop: string | any): this;
    resetFailed(prop: string | any): this;
    isWaiting(key: string): boolean;
    isFailed(key: any): boolean;
    getWaiting(): object;
    getFailed(): object;
    set(prop: string | object, value?: any): this;
    update(updates: object): this;
    getState(prop?: string): TState<MData>;
    reset(newState: TState<MData>): this;
    equals(prop: string, value: any, exact?: boolean): boolean;
    includes(prop: string, value: string, caseSensitive?: boolean): boolean | Error;
    private prepare;
}
