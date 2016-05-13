'use strict';

const updateWebpackConfig = require('./utils/update-webpack-config');

module.exports = {
  'webpack.updateConfig'(webpackConfig) {
    return updateWebpackConfig(webpackConfig, this.query.config);
  },
};
