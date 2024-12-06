const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: defaultConfig.output.path,
    },
};
