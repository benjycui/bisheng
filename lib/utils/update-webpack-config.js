'use strict';

const path = require('path');
const webpack = require('atool-build/lib/webpack');
const getConfig = require('./get-config');
const resolvePlugins = require('./resolve-plugins');
const bishengLib = path.join(__dirname, '..');
const bishengLibLoaders = path.join(bishengLib, 'loaders');

module.exports = function updateWebpackConfig(webpackConfig, configFile, isBuild) {
  const entryPath = path.join(bishengLib, 'entry.nunjucks.js');
  const config = getConfig(configFile);

  /* eslint-disable no-param-reassign */
  webpackConfig.entry = {};
  if (isBuild) {
    webpackConfig.output.path = config.output;
  }
  webpackConfig.output.publicPath = isBuild ? config.root : '/';
  webpackConfig.module.loaders.push({
    test: /\.nunjucks\.js$/i,
    loader: `babel!${path.join(bishengLibLoaders, 'bisheng-nunjucks-loader')}` +
      `?config=${configFile}&isBuild=${isBuild}`,
  });
  webpackConfig.module.loaders.push({
    test(filename) {
      return filename === path.join(bishengLib, 'utils', 'data.js');
    },
    loader: `${path.join(bishengLibLoaders, 'bisheng-data-loader')}` +
      `?config=${configFile}`,
  });
  webpackConfig.module.loaders.push({
    test: /\.md$/,
    exclude: /node_modules/,
    loaders: ['babel', `${path.join(bishengLibLoaders, 'markdown-loader')}?config=${configFile}`],
  });
  /* eslint-enable no-param-reassign */

  const pluginsConfig = resolvePlugins(config.plugins, 'config');
  pluginsConfig.forEach((pluginConfig) => {
    require(pluginConfig[0])(pluginConfig[1]).webpackConfig(webpackConfig, webpack);
  });

  const customizedWebpackConfig = config.webpackConfig(webpackConfig, webpack);

  if (customizedWebpackConfig.entry.index) {
    throw new Error('Should not set `webpackConfig.entry.index`!');
  }
  customizedWebpackConfig.entry.index = entryPath;
  return customizedWebpackConfig;
};
