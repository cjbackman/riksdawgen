/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 1337,
		historyApiFallback: true
	},
  devtool: 'cheap-module-source-map',
  plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
});