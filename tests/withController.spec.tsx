import {Controller, withController} from '../src';
import * as React from 'react';
import {createStore} from '../example/src/utils';
import {mount, ShallowWrapper} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

describe('withController', () => {
  class TestView extends React.Component<any> {
    public controller;

    public render() {
      return <div>123</div>;
    }
  }

  const Component = withController(Controller)(TestView);
  const appStore = createStore({data: {some: true}});
  const mountedComponent = mount(<Component store={appStore}/>);
  const instancePromise = new Promise((resolve) => {
    setTimeout(() => {
      mountedComponent.update();
      resolve(mountedComponent.find('Wrapper'));
    }, 1);
  });
  it('it should render view', (done) => {
    instancePromise.then((instance) => {
      expect((instance as ShallowWrapper).find('TestView').length).toEqual(1);
      done();
    });
  });
  it('should have dispatcher from redux', () => {
    expect(Controller.prototype.dispatch).toEqual(appStore.dispatch);
  });
});
