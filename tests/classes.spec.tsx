import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {shallow, mount, render} from 'enzyme';
import * as MVC from '../src';
import {createStore} from '../example/src/utils';

Enzyme.configure({ adapter: new Adapter() });

class TestModel extends MVC.Model<any> {
  public static defaults: any = {
  };

  constructor(state) {
    super(state);
  }
}

class TestController<T extends TestModel> extends MVC.Controller<T> {
  public static storeKey = 'storeKey';
  public static actions = {};
  public static connectedState = [];
  public static Model = TestModel;

  public constructor(props, context) {
    super(TestModel, props, context);
  }
}

@MVC.withController(TestController)
class TestView extends React.Component<any> {
  public controller: TestController<TestModel>;

  public render() {
    return <div>test</div>;
  }
}

const props = {
};

describe('', () => {
  it('should', () => {
    // const newComponent = getMVCMountedComponent(TestView, props);
    // const instance = newComponent.instance() as TestView;
  });
});


function getMVCMountedComponent(Component, props: object) {
  const appStore = createStore({data: {}});
  const mountedComponent = mount(<Component store={appStore} {...props}/>);
  const instance = mountedComponent.find('Wrapper').instance();
  console.log(mountedComponent.debug());
  return mount(<instance.Component {...props}/>);
}
