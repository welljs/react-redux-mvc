import * as React from 'react';
import { object, element } from 'prop-types';

export interface IReactReduxMVCProps {
  children: JSX.Element;
  store: object;
}

export interface IChildContextProps {
  store: object;
}

export class ReactReduxMvc extends React.Component<IReactReduxMVCProps, {}> {
  public static childContextTypes: IChildContextProps = {
    store: () => null
  };

  public static propTypes = {
    children: element.isRequired,
    store: object.isRequired
  };

  private store: object;

  public constructor(props: IReactReduxMVCProps, context) {
    super(props, context);
    this.store = props.store;
  }

  public getChildContext(): IChildContextProps {
    return {
      store: this.store
    };
  }

  public render() {
    return React.Children.only(this.props.children);
  }
}
