const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.join(__dirname, './src'),
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader',
                exclude: /(node_modules)/,
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
        ]
    }
};