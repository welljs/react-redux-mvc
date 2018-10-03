import * as React from 'react';
export interface IReactReduxMVCProps {
    children: JSX.Element;
    store: object;
}
export interface IChildContextProps {
    store: object;
}
export declare class ReactReduxMvc extends React.Component<IReactReduxMVCProps, {}> {
    static childContextTypes: IChildContextProps;
    private store;
    constructor(props: IReactReduxMVCProps, context: any);
    getChildContext(): IChildContextProps;
    render(): React.ReactElement<any>;
}
