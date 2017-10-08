/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './front/index.html',
	inject: 'body'
});

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: ['babel-polyfill', './front/index.js'],
	output: {
		path: path.resolve('dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ enforce: 'pre', test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/},
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(png|jpg|gif|png)$/, loader: 'file-loader' },
      { test: /\.scss$/, loaders: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }] }
		]
	},
	devServer: {
		contentBase: path.resolve('dist'),
		port: 1337,
		historyApiFallback: true
	},
	plugins: [HtmlWebpackPluginConfig]
};