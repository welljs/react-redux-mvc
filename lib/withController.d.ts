import * as BasicController from './Controller';
export interface IWrapperProps {
    store?: object;
}
export interface IWrapperState {
    canRender: boolean;
}
export declare function withController(Controller?: typeof BasicController.Controller): (Component: any) => any;
