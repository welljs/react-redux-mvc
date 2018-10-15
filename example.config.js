const webpack = require('webpack');
const path = require('path');

//Execute npm run build, and set this flag to true to use source version
const useSources = false;

const resolve = {
    alias: {},
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
};
const include = [];

if (useSources) {
    resolve.alias['react-redux-mvc'] = path.join(__dirname, './src/index.ts');
    include.push(path.resolve(__dirname, `./example/src`));
    include.push(path.resolve(__dirname, `./src`));
    console.log(`\n> compile using sources...\n`);
}
else {
    resolve.alias['react-redux-mvc'] = path.join(__dirname, './lib/index.ts');
    include.push(path.resolve(__dirname, `./example/src`));
    include.push(path.resolve(__dirname, `./lib`));
    console.log('\n> compile using production lib...\n');
}

module.exports = {
    context: path.join(__dirname, './'),
    devtool: 'source-map',
    entry: './example/src/app.tsx',
    output: {
        path: path.resolve(__dirname, `./example`),
        filename: 'example.js'
    },
    resolve,
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js)$/,
                loader: 'awesome-typescript-loader',
                exclude: /(node_modules)/,
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, `./example`),
        hot: true,
        inline: true
    },
};
