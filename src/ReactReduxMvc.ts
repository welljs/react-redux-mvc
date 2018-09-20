import * as React from 'react';

export interface IReactReduxMVCProps {
  children: JSX.Element;
  store: object;
}

export interface IChildContextProps {
  store: object;
}

export class ReactReduxMvc extends React.Component<IReactReduxMVCProps, {}> {
  private store: object;

  public constructor(props: IReactReduxMVCProps, context) {
    super(props, context);
    const {store} = props;
    this.store = store;
  }

  public getChildContext(): IChildContextProps {
    return {
      store: this.store
    };
  }

  public render() {
    const {children} = this.props;
    return React.Children.only(children);
  }
}
