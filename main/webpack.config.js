//@ts-check

'use strict';
const path = require('path');
const webpack = require('webpack');

/**@type {import('webpack').Configuration}*/
module.exports = {
	// target: 'web',
	entry: './src/main.ts',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'index.js',
		// library: {
		// 	name: "template-plotly-ts",
		// 	type: "amd"
		// },
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
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['style-loader','css-loader','sass-loader']
			}
		]
	},
	externals: {
		"plotly.js-dist-min": "Plotly",
		"data": "./public/data.js",
		// "data": {
		// 	"commonjs": "./public/data.js",
		// 	"amd": "./public/data.js",
		// 	"umd": "./public/data.js",
		// 	"root": "template_plotly_ts_temp"
		// }
	}
};
