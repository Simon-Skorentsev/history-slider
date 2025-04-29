const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

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
						},
					},
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},
});
