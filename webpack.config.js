const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.join(__dirname, './src'),
    entry: './index.js',
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