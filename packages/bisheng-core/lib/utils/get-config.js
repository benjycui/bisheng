const fs = require('fs');
const path = require('path');

const defaultConfig = {
  source: './posts',
  output: './_site',
  theme: './_theme',
  port: 8000,
  root: '/',
  plugins: [],
  webpackConfig(config) {
    return config;
  },
};

const pluginHighlight = path.join(__dirname, '..', 'bisheng-plugin-highlight');

module.exports = function getConfig(configFile) {
  /* eslint-disable global-require */
  const customizedConfig = fs.existsSync(configFile) ? require(configFile) : {};
  /* eslint-enable global-require */

  const config = Object.assign({}, defaultConfig, customizedConfig);
  config.plugins = [pluginHighlight].concat(config.plugins);
  return config;
};
