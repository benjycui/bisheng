const path = require('path');
const webpack = require('atool-build/lib/webpack');
const getConfig = require('./get-config');
const bishengLib = `${__dirname}${path.sep}`;

module.exports = {
  'webpack.updateConfig'(webpackConfig) {
    const configFile = this.query.config;

    /* eslint-disable no-param-reassign */
    webpackConfig.entry = {};
    webpackConfig.module.loaders.push({
      test(filename) {
        return filename === `${bishengLib}bisheng.data`;
      },
      loader: `${bishengLib}bisheng-data-loader?config=${configFile}`,
    });
    webpackConfig.module.loaders.push({
      test: /\.md$/,
      exclude: /node_modules/,
      loaders: ['babel', `${bishengLib}markdown-loader`],
    });
    /* eslint-enable no-param-reassign */

    const config = getConfig(configFile);
    const customizedWebpackConfig = config.webpackConfig(webpackConfig, webpack);

    if (customizedWebpackConfig.entry.index) {
      throw new Error('Should not set `webpackConfig.entry.index`!');
    }
    customizedWebpackConfig.entry.index = `${bishengLib}entry.jsx`;
    return customizedWebpackConfig;
  },
};
