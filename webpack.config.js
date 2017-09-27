/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	inject: 'body'
});

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: './src/index.js',
	output: {
		path: path.resolve('dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ enforce: 'pre', test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/},
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
		]
	},
	devServer: {
		contentBase: path.resolve('dist'),
		port: 1337,
		historyApiFallback: true
	},
	plugins: [HtmlWebpackPluginConfig]
};