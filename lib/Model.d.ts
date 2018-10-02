export interface IDefaultState {
    __waiting: object;
    __failed: object;
    _id?: string;
}
export declare type TState<T> = T & IDefaultState;
export interface IDefaultModelOptions {
    action?: string;
}
export declare class Model<T extends object> {
    state: TState<T>;
    options?: IDefaultModelOptions;
    constructor(props: T, options?: IDefaultModelOptions);
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
    update(updates: Partial<T> | object): this;
    getState(prop?: string): TState<T>;
    reset(newState: TState<T>): this;
    equals(prop: string, value: any, exact?: boolean): boolean;
    includes(prop: string, value: string, caseSensitive?: boolean): boolean;
    private prepare;
}
