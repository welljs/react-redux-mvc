const webpack = require('webpack');
const path = require('path');

//Execute npm run build, and reset this flag to false to use production version
const useSources = true;

const resolve = {
    root: path.resolve(__dirname),
    alias: {},
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [ 'node_modules']

};
const include = [];

if (useSources) {
    resolve.alias['react-redux-mvc'] = path.join(__dirname, './src/index.js');
    include.push(path.resolve(__dirname, `./example/src`));
    include.push(path.resolve(__dirname, `./src`));
    console.log(`\n> compile using sources...\n`);
}
else {
    resolve.alias['react-redux-mvc'] = path.join(__dirname, './lib/index.js');
    include.push(path.resolve(__dirname, `./example/src`));
    include.push(path.resolve(__dirname, `./lib`));
    console.log('\n> compile using production lib...\n');
}

module.exports = {
    context: path.join(__dirname,'./'),
    devtool: 'source-map',
    entry: './example/src/app.js',
    output: {
        path: './example',
        filename: 'example.js'
    },
    resolve,
    module: {
        loaders: [
            {
                test: /\.js/,
                loaders: ['babel-loader?cacheDirectory'],
                include,
            }
        ]
    }
};