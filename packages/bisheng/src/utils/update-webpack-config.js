const path = require('path');
const webpack = require('atool-build/lib/webpack');
const getBishengConfig = require('./get-bisheng-config');

const bishengLib = path.join(__dirname, '..');
const bishengLibLoaders = path.join(bishengLib, 'loaders');

module.exports = function updateWebpackConfig(webpackConfig, configFile, isBuild) {
  const bishengConfig = getBishengConfig(configFile);

  /* eslint-disable no-param-reassign */
  webpackConfig.entry = {};
  if (isBuild) {
    webpackConfig.output.path = bishengConfig.output;
  }
  webpackConfig.output.publicPath = isBuild ? bishengConfig.root : '/';
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
      `${path.join(bishengLibLoaders, 'source-loader')}` +
        `?config=${configFile}&isBuild=${isBuild}`,
    ],
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
