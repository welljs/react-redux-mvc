import * as path from 'path';
import * as webpack from 'webpack';

module.exports = {
  context: path.join(__dirname, './src'),
  entry: './index.ts',
  output: {
    path: './lib',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loaders: 'babel-loader',
        include: [
          path.resolve(__dirname, `./src`)
        ]
      }
    ]
  }
};