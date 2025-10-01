const path = require('path');

const getSassLoaderOptions = (isDevelopment = false) => ({
	sourceMap: isDevelopment,
	additionalData: `
		@use '@/config/vars' as *;
		@use '@/config/mixins' as *;
		@use '@/config/functions' as *;
	`,
	sassOptions: {
		includePaths: [path.resolve(__dirname, 'src')],
	},
});

module.exports = { getSassLoaderOptions };
