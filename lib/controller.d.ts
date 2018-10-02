import { AnyAction } from 'redux';
import { Model } from './Model';
export interface IControllerActions {
    [name: string]: any;
}
export declare class Controller<T extends Model<object>> {
    static connectedState: string[];
    static actions: any;
    storeKey: string;
    name: string;
    getGlobalState: () => void;
    componentWillReceiveProps(currentProps: T, nextProps: T): void;
    dispatch: <A extends AnyAction>(action: A) => A;
    Model: Model<object>;
    constructor(Model: any, ...props: any[]);
    mappedProps(state: string): object;
    action(...args: any[]): Promise<any>;
    onInit: () => Promise<any>;
    getState(prop?: string): any;
    getWaiting(): object;
    isWaiting(prop: any): boolean;
    isFailed(prop: any): boolean;
    getFailed(): object;
}
