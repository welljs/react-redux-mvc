import * as React from 'react';
import {connect} from 'react-redux';
import hoistStatics from 'hoist-non-react-statics';
import isFunction from 'lodash/isFunction';
import * as BasicController from './Controller';

export interface IWrapperProps {
  store?: object;
}

export interface IWrapperState {
  canRender: boolean;
}

export function withController(Controller = BasicController.Controller) {
  return Component => {
    @connect(state => BasicController.Controller.prototype.mappedProps(state))
    class Wrapper extends React.Component<IWrapperProps, IWrapperState> {
      public constructor(props: IWrapperProps, context) {
        super(props, context);
        const {store} = props;
        this.store = store || context.store;
        Controller.prototype.name = Component.prototype.constructor.name + 'Controller';
        Controller.prototype.dispatch = this.store.dispatch;
        Controller.prototype.getGlobalState = function (prop) {
          return prop ? this.store.getState()[prop] : this.store.getState();
        }.bind(this);

        const controller = new Controller(props, context);
        Component.prototype.controller = controller;
        controller.onInit().then(() => this.setState({canRender: true}));
      }

      public render() {
        const {canRender} = this.state;
        return canRender ? React.createElement(Component, {...this.props}) : null;
      }
    }

    if (isFunction(Component.prototype.componentWillReceiveProps) && isFunction(Controller.prototype.componentWillReceiveProps)) {
      const fn = Component.prototype.componentWillReceiveProps;
      Component.prototype.componentWillReceiveProps = function (nextPops) {
        Controller.prototype.componentWillReceiveProps.call(Component.prototype.controller, this.props, nextPops);
        fn.call(this, nextPops);
      };
    }
    return hoistStatics(Wrapper, Component);
  };
}
