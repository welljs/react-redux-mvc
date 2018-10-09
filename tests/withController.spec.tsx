import {Controller, withController} from '../src';
import * as React from 'react';
import {createStore} from '../example/src/utils';
import {shallow, mount, render} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

describe('withController', () => {
  class TestView extends React.Component<any> {
    public render() {
      return <div>123</div>;
    }
  }

  it('it should render view', (done) => {
    const Component = withController(Controller)(TestView);
    const appStore = createStore({data: {some: true}});
    const mountedComponent = mount(<Component store={appStore}/>);
    setTimeout(() => {
      mountedComponent.update();
      const instance = mountedComponent.find('Wrapper');
      expect(instance.find('TestView').length).toEqual(1);
      done()
    }, 1)
  })
});