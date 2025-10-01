const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, 'src', 'index.tsx'),
	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
		plugins: [new TsconfigPathsPlugin()],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.join(__dirname, 'build'),
		clean: true,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: true,
			template: path.join(__dirname, 'public', 'index.html'),
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin({
				parallel: true,
			}),
		],
	},
};
