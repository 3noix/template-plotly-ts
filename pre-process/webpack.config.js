//@ts-check

'use strict';
const path = require('path');
const webpack = require('webpack');

/**@type {import('webpack').Configuration}*/
module.exports = {
	target: 'web',
	entry: './src/data.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'data.js',
		library: {
			name: "template_plotly_ts_temp",
			type: "amd"
		},
		devtoolModuleFilenameTemplate: '../[resource-path]'
	},
	devtool: false,
	resolve: {
		mainFields: ['browser', 'module', 'main'],
		extensions: ['.ts', '.js']
	},
	optimization: {
		minimize: false
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [{loader: 'ts-loader'}]
			}
		]
	}
};
