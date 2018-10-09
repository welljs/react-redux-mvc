import {Controller, Model} from '../src';

describe('Controller', () => {
  const controller = new Controller(Model, {});
  const dispatch = jest.fn();
  const getGlobalState = () => {
    return ({[controller.storeKey]: 'test'});
  };
  Controller.storeKey = 'testStoreKey';
  controller.storeKey = 'testStoreKey';
  controller.dispatch = dispatch;
  controller.getGlobalState = getGlobalState;
  Controller.connectedState = ['testState'];
  it('should call dispatch', () => {
    expect(dispatch).not.toBeCalled();
    controller.action(() => {});
    expect(dispatch).toBeCalled();
  });
  it('should call getGlobalState function', () => {
    expect(controller.getState()).toEqual('test');
  });
});
