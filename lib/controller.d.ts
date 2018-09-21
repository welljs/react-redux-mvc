import { Dispatch, Action } from 'redux';
import { Model } from './model';
export interface IControllerActions {
    [name: string]: (any);
}
export declare class Controller<T extends Model<any>> {
    static connectedState: string[];
    static actions: any;
    storeKey: string | null;
    name: string;
    getGlobalState: () => void;
    dispatch: (fn: () => any) => Dispatch<Action>;
    componentWillReceiveProps: () => void;
    Model: T;
    constructor(Model: T, ...props: any[]);
    mappedProps(state: any): {};
    action(...args: any[]): Dispatch<Action>;
    onInit: () => Promise<any>;
    getState(prop?: string): any;
    getWaiting(): any;
    isWaiting(prop: any): boolean | void;
    isFailed(prop: any): boolean | void;
    getFailed(): any;
}
