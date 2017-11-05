/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  inject: 'body'
});

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
      path: path.resolve('./dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ },
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.(png|jpg|gif|png)$/, loader: 'file-loader' },
        { test: /\.(css|scss)$/, loaders: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }] }
      ]
    },
    plugins: [HtmlWebpackPluginConfig]
};