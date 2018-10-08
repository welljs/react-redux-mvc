const webpack = require('webpack');

module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  collectCoverage: true,
  testRegex: '(/__tests__/.*!(e2e)|(\\.|/)(test|spec))\\.(tsx?)$',
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy'
  }
};
