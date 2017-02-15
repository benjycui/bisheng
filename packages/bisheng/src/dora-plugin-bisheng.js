const updateWebpackConfig = require('./utils/update-webpack-config');

module.exports = {
  'webpack.updateConfig': function (webpackConfig) {
    return updateWebpackConfig(webpackConfig);
  },
};
