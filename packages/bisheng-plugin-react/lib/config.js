'use strict';

const path = require('path');

function generateQuery(config) {
  return Object.keys(config)
    .map((key) => `${key}=${config[key]}`)
    .join('&');
}

module.exports = (config) => {
  return {
    webpackConfig(bishengWebpackConfig) {
      bishengWebpackConfig.module.loaders.forEach((loader) => {
        if (loader.test.toString() !== '/\\.md$/') return;
        const babelIndex = loader.loaders.indexOf('babel');
        const query = generateQuery(config);
        loader.loaders.splice(babelIndex + 1, 0, path.join(__dirname, `jsonml-react-loader?${query}`));
      });
      return bishengWebpackConfig;
    },
  };
};
