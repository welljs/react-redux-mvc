import * as React from 'react';
import {connect} from 'react-redux';
import * as hoistStatics from 'hoist-non-react-statics';
import {isFunction} from 'lodash';
import {Controller as BasicController} from './Controller';
import {Model} from './Model';

export interface IWrapperProps extends Model<object> {
  store?: object;
  dispatch?: any;
}

export interface IWrapperState {
  canRender: boolean;
}

function mapStateToProps(Controller) {
  return function (state) {
    return Controller.prototype.mappedProps(state);
  }
}

export function withController(Controller = BasicController): any {
  return Component => {
    class Wrapper extends React.Component<IWrapperProps, IWrapperState> {
      private store;

      static contextTypes = {
        store: () => {return null}
      };

      public constructor(props: IWrapperProps, context) {
        super(props, context);
        this.state = {
          canRender: false
        };
        this.store = props.store || context.store;
        const controller = new Controller(props, context);
        controller.dispatch = this.store.dispatch;
        controller.getGlobalState = function (prop) {
          return prop ? this.store.getState()[prop] : this.store.getState();
        }.bind(this);
        controller.name = Component.prototype.constructor.name + 'Controller';;
        Component.prototype.controller = controller;
        controller.onInit().then(() => this.setState({canRender: true}));
      }

      public render() {
        const {canRender} = this.state;
        return canRender ? React.createElement(Component, {...this.props}) : null;
      }
    }

    const connectedWrapper = connect(mapStateToProps(Controller))(Wrapper);
    if (isFunction(Component.prototype.componentWillReceiveProps) && isFunction(Controller.prototype.componentWillReceiveProps)) {
      const fn = Component.prototype.componentWillReceiveProps;
      Component.prototype.componentWillReceiveProps = function (nextPops) {
        Controller.prototype.componentWillReceiveProps.call(Component.prototype.controller, this.props, nextPops);
        fn.call(this, nextPops);
      };
    }
    return hoistStatics(connectedWrapper, Component);
  };
}
