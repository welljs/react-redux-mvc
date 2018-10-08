import {Model} from '../src';

describe('Model', () => {
  const testKey = 'testKey';
  const testModelData = {
    [testKey]: true,
  };
  const testModel = new Model(testModelData);
  it('should set waiting', () => {
    testModel.setWaiting(testKey);
    expect(testModel.isWaiting(testKey)).toEqual(true);
  });
  it('should reset waiting', () => {
    testModel.resetWaiting(testKey);
    expect(testModel.isWaiting(testKey)).toEqual(false);
  });
  it('should set failed', () => {
    testModel.setFailed(testKey);
    expect(testModel.isFailed(testKey)).toEqual(true);
  });
  it('should reset failed', () => {
    testModel.resetFailed(testKey);
    expect(testModel.isFailed(testKey)).toEqual(false);
  });
  it('should return model state', () => {
    expect(testModel.getState(testKey)).toEqual(testModelData[testKey]);
  });
});