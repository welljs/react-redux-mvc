import * as BasicController from './Controller';
import { Model } from './Model';
export interface IWrapperProps extends Model<object> {
    store?: object;
    dispatch?: any;
}
export interface IWrapperState {
    canRender: boolean;
}
export declare function withController(Controller?: typeof BasicController.Controller): (Component: any) => any;
