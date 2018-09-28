const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, './src'),
  entry: './index.ts',
  output: {
    path: './lib',
    filename: 'index.js'
  },
};