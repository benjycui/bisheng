const path = require('path');
const webpack = require('atool-build/lib/webpack');
const getConfig = require('./get-config');
const bishengLib = path.join(__dirname, '..');
const bishengLibLoaders = path.join(bishengLib, 'loaders');

module.exports = function updateWebpackConfig(webpackConfig, configFile) {
  const entryPath = path.join(bishengLib, 'entry.js');
  const config = getConfig(configFile);
  
  /* eslint-disable no-param-reassign */
  webpackConfig.entry = {};
  webpackConfig.output.path = config.output;
  webpackConfig.module.loaders.push({
    test(filename) {
      return filename === entryPath;
    },
    loader: `${path.join(bishengLibLoaders, 'bisheng-entry-loader')}?config=${configFile}`,
  });
  webpackConfig.module.loaders.push({
    test(filename) {
      return filename === path.join(bishengLib, 'data.js');
    },
    loader: `${path.join(bishengLibLoaders, 'bisheng-data-loader')}?config=${configFile}`,
  });
  webpackConfig.module.loaders.push({
    test: /\.md$/,
    exclude: /node_modules/,
    loaders: [
      'babel',
      `${path.join(bishengLibLoaders, 'markdown-loader')}?config=${configFile}`,
    ],
  });
  /* eslint-enable no-param-reassign */

  const customizedWebpackConfig = config.webpackConfig(webpackConfig, webpack);

  if (customizedWebpackConfig.entry.index) {
    throw new Error('Should not set `webpackConfig.entry.index`!');
  }
  customizedWebpackConfig.entry.index = entryPath;
  return customizedWebpackConfig;
};
