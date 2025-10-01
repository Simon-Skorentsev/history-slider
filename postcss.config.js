module.exports = {
	plugins: [
		[
			'postcss-preset-env',
			{
				stage: 3,
				features: {
					'nesting-rules': true,
					'custom-media-queries': true,
					'custom-properties': false,
				},
				autoprefixer: {
					flexbox: 'no-2009',
					grid: 'autoplace',
				},
				browsers: ['>0.2%', 'not dead', 'not op_mini all'],
			},
		],
	],
};
