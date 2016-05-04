const fs = require('fs');
const defaultConfig = {
  source: './posts',
  extension: '.md',
  output: './_site',
  theme: './_theme',
  port: 8000,
  plugins: [],
  webpackConfig(config) {
    return config;
  },
};

module.exports = function getConfig(configFile) {
  /* eslint-disable global-require */
  const customizedConfig = fs.existsSync(configFile) ? require(configFile) : {};
  /* eslint-enable global-require */

  const config = Object.assign({}, defaultConfig, customizedConfig);
  return config;
};
