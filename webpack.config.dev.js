const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const { getSassLoaderOptions } = require('./webpack.config.helpers');

module.exports = merge(commonConfig, {
	devtool: 'inline-source-map',
	mode: 'development',
	devServer: {
		static: path.join(__dirname, 'public/'),
		hot: true,
		host: 'localhost',
		port: 3000,
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								auto: true,
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
							sourceMap: true,
							importLoaders: 2,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: getSassLoaderOptions(true),
					},
				],
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
});
