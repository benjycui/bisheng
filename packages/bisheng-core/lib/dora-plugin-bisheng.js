const path = require('path');
const webpack = require('atool-build/lib/webpack');
const getConfig = require('./utils/get-config');
const bishengLib = `${__dirname}${path.sep}`;
const bishengLibLoaders = `${bishengLib}loaders${path.sep}`;

module.exports = {
  'webpack.updateConfig'(webpackConfig) {
    const configFile = this.query.config;

    /* eslint-disable no-param-reassign */
    webpackConfig.entry = {};
    webpackConfig.module.loaders.push({
      test(filename) {
        return filename === `${bishengLib}entry.js`;
      },
      loader: `${bishengLibLoaders}bisheng-entry-loader?config=${configFile}`,
    });
    webpackConfig.module.loaders.push({
      test(filename) {
        return filename === `${bishengLib}data.js`;
      },
      loader: `${bishengLibLoaders}bisheng-data-loader?config=${configFile}`,
    });
    webpackConfig.module.loaders.push({
      test: /\.md$/,
      exclude: /node_modules/,
      loaders: [
        'babel',
        `${bishengLibLoaders}markdown-loader?config=${configFile}`,
      ],
    });
    /* eslint-enable no-param-reassign */

    const config = getConfig(configFile);
    const customizedWebpackConfig = config.webpackConfig(webpackConfig, webpack);

    if (customizedWebpackConfig.entry.index) {
      throw new Error('Should not set `webpackConfig.entry.index`!');
    }
    customizedWebpackConfig.entry.index = `${bishengLib}entry.js`;
    return customizedWebpackConfig;
  },
};
