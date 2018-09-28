import { Dispatch, Action, AnyAction } from 'redux';
import { Model } from './Model';
export interface IControllerActions {
    [name: string]: any;
}
export declare class Controller<T extends Model<object>> {
    static connectedState: string[];
    static actions: any;
    storeKey: string | null;
    name: string;
    getGlobalState: () => void;
    dispatch: <A extends AnyAction>(action: A) => A;
    componentWillReceiveProps: () => void;
    Model: T;
    constructor(Model: T, ...props: any[]);
    mappedProps(state: string): object;
    action(...args: any[]): Dispatch<Action>;
    onInit: () => Promise<any>;
    getState(prop?: string): any;
    getWaiting(): object | void;
    isWaiting(prop: any): boolean | void;
    isFailed(prop: any): boolean | void;
    getFailed(): object | void;
}
