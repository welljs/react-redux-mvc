import {Collection, Model} from '../src';
import {generateGuid} from '../src/helpers';

describe('collection', () => {
  const testCollectionData = [
    {
      test: true
    },
    {
      second: 'test'
    }
  ];
  const testCollection = new Collection(testCollectionData);
  const firstKeyToTest = Object.keys(testCollectionData[0])[0];
  const lastKeyToTest = Object.keys(testCollectionData[testCollectionData.length - 1])[0];
  it('should return data includes testCollectionData', () => {
    expect(testCollection.getState()[0][firstKeyToTest]).toEqual(testCollectionData[0][firstKeyToTest]);
  });
  it('should return last model with correct value', () => {
    expect(testCollection.last().getState(lastKeyToTest)).toEqual(testCollectionData[testCollectionData.length - 1][lastKeyToTest]);
  });
  it('should return first model with correct value', () => {
    expect(testCollection.first().getState(firstKeyToTest)).toEqual(testCollectionData[0][firstKeyToTest]);
  });
  it('should find model', () => {
    const foundModel = testCollection.find(firstKeyToTest, testCollectionData[0][firstKeyToTest]);
    expect(foundModel).not.toBe(undefined);
  });
  it('should not find model', () => {
    const foundModel = testCollection.find(generateGuid(), generateGuid());
    expect(foundModel).toBe(undefined);
  });
  it('should return correctly length', () => {
    const filteredModels = testCollection.filter(firstKeyToTest, testCollectionData[0][firstKeyToTest]);
    expect(filteredModels.length).toEqual(1);
  });
  it('should return index of model', () => {
    const foundIndex = testCollection.findIndex(firstKeyToTest, testCollectionData[0][firstKeyToTest]);
    expect(foundIndex).toEqual(0);
  });
  it('should return length', () => {
    expect(testCollection.size()).toEqual(testCollectionData.length);
  });
  it('should find model', () => {
    const foundModel = testCollection.findIncludes(lastKeyToTest, testCollectionData[testCollectionData.length - 1][lastKeyToTest]);
    expect(foundModel).not.toBe(undefined);
  });
});