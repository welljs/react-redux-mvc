import {Controller, Model, withController} from '../src';
import * as React from 'react';
import {createStore} from '../example/src/utils';
import {shallow, mount, render} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

describe('Controller', () => {
  const testKey = 'testKey';
  const testModelData = {
    [testKey]: true,
  };
  const testModel = new Model(testModelData);
  const testController = new Controller(testModel, {some: true});

  @withController(Controller)
  class TestView extends React.Component<any> {
    public render() {
      return <div>123</div>;
    }

    public test = () => {
      return 123;
    }
  }

  it('', () => {
    const appStore = createStore({data: {}});
    const mountedComponent = mount(<TestView store={appStore}/>);
    // const instance = mountedComponent.find('Wrapper').instance();
    // console.log(instance._reactInternalFiber.child);
  })
});