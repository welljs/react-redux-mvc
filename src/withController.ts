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
  };
}

export function withController(Controller = BasicController): any {
  return Component => {
    class Wrapper extends React.Component<IWrapperProps, IWrapperState> {
      public static contextTypes = {
        store: () => null
      };

      public state = {
        canRender: false
      };

      private store;

      constructor (props, context) {
        super(props, context);
        this.store = props.store || context.store;
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

    const connectedWrapper = connect(mapStateToProps(Controller))(Wrapper);
    const fn = Component.prototype.componentWillReceiveProps;
    Component.prototype.componentWillReceiveProps = function (nextPops) {
      Controller.prototype.componentWillReceiveProps.call(Component.prototype.controller, this.props, nextPops);
      if (isFunction(fn)) {
        fn.call(this, nextPops);
      }
    };
    return hoistStatics(connectedWrapper, Component);
  };
}
