'use strict';

const path = require('path');
const webpack = require('atool-build/lib/webpack');
const getConfig = require('./get-config');
const resolvePlugins = require('./resolve-plugins');
const bishengLib = path.join(__dirname, '..');
const bishengLibLoaders = path.join(bishengLib, 'loaders');

module.exports = function updateWebpackConfig(webpackConfig, configFile, isBuild) {
  const config = getConfig(configFile);

  /* eslint-disable no-param-reassign */
  webpackConfig.entry = {};
  if (isBuild) {
    webpackConfig.output.path = config.output;
  }
  webpackConfig.output.publicPath = isBuild ? config.root : '/';
  webpackConfig.module.loaders.push({
    test(filename) {
      return filename === path.join(bishengLib, 'utils', 'data.js') ||
        filename === path.join(bishengLib, 'utils', 'ssr-data.js');
    },
    loader: `${path.join(bishengLibLoaders, 'bisheng-data-loader')}` +
      `?config=${configFile}&isBuild=${isBuild}`,
  });

  webpackConfig.module.loaders.push({
    test: /\.md$/,
    exclude: /node_modules/,
    loaders: [
      'babel',
      `${path.join(bishengLibLoaders, 'markdown-loader')}` +
        `?config=${configFile}&isBuild=${isBuild}`,
    ],
  });
  /* eslint-enable no-param-reassign */

  const pluginsConfig = resolvePlugins(config.plugins, 'config');
  pluginsConfig.forEach((pluginConfig) => {
    require(pluginConfig[0])(pluginConfig[1]).webpackConfig(webpackConfig, webpack);
  });

  const customizedWebpackConfig = config.webpackConfig(webpackConfig, webpack);

  const entryPath = path.join(bishengLib, '..', 'tmp', 'entry.' + config.entryName + '.js');
  if (customizedWebpackConfig.entry[config.entryName]) {
    throw new Error('Should not set `webpackConfig.entry.' + config.entryName + '`!');
  }
  customizedWebpackConfig.entry[config.entryName] = entryPath;
  return customizedWebpackConfig;
};
