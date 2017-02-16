const path = require('path');
const webpack = require('atool-build/lib/webpack');
const context = require('../context');

const bishengLib = path.join(__dirname, '..');
const bishengLibLoaders = path.join(bishengLib, 'loaders');

module.exports = function updateWebpackConfig(webpackConfig) {
  const bishengConfig = context.bishengConfig;

  /* eslint-disable no-param-reassign */
  webpackConfig.entry = {};
  if (context.isBuild) {
    webpackConfig.output.path = bishengConfig.output;
  }
  webpackConfig.output.publicPath = context.isBuild ? bishengConfig.root : '/';
  webpackConfig.module.loaders.push({
    test(filename) {
      return filename === path.join(bishengLib, 'utils', 'data.js') ||
        filename === path.join(bishengLib, 'utils', 'ssr-data.js');
    },
    loader: path.join(bishengLibLoaders, 'bisheng-data-loader'),
  });
  /* eslint-enable no-param-reassign */

  const customizedWebpackConfig = bishengConfig.webpackConfig(webpackConfig, webpack);

  const entryPath = path.join(bishengLib, '..', 'tmp', `entry.${bishengConfig.entryName}.js`);
  if (customizedWebpackConfig.entry[bishengConfig.entryName]) {
    throw new Error(`Should not set \`webpackConfig.entry.${bishengConfig.entryName}\`!`);
  }
  customizedWebpackConfig.entry[bishengConfig.entryName] = entryPath;
  return customizedWebpackConfig;
};
