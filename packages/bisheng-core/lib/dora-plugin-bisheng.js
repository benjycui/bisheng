const path = require('path');
const webpack = require('atool-build/lib/webpack');
const getConfig = require('./get-config');
const bishengLib = `${__dirname}${path.sep}`;

module.exports = {
  'webpack.updateConfig'(webpackConfig) {
    const configFile = this.query.config;

    webpackConfig.entry = {};
    webpackConfig.module.loaders.push({
      test(filename) {
        return filename === `${bishengLib}bisheng.data`;
      },
      loader: `${bishengLib}bisheng-data-loader?config=${configFile}`,
    });

    const config = getConfig(configFile);
    const customizedWebpackConfig = config.webpackConfig(webpackConfig, webpack);

    if (customizedWebpackConfig.entry.index) {
      throw new Error('Should not set `webpackConfig.entry.index`!');
    }
    customizedWebpackConfig.entry.index = `${bishengLib}entry.jsx`;
    return customizedWebpackConfig;
  }
};
