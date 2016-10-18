'use strict';

const fs = require('fs');
const path = require('path');

const defaultConfig = {
  source: './posts',
  output: './_site',
  theme: './_theme',
  htmlTemplate: path.join(__dirname, '../template.html'),
  entry: {},
  port: 8000,
  root: '/',
  plugins: [],
  doraConfig: {},
  webpackConfig(config) {
    return config;
  },
};

const pluginHighlight = path.join(__dirname, '..', 'bisheng-plugin-highlight');

function isRelative(filepath) {
  return filepath.charAt(0) === '.';
}

module.exports = function getConfig(configFile) {
  const customizedConfig = fs.existsSync(configFile) ? require(configFile) : {};
  const config = Object.assign({}, defaultConfig, customizedConfig);

  // Merge `theme` `htmlTemplate` into `entry` as `entry.index`.
  if (!config.entry.index) {
    config.entry.index = {
      theme: config.theme,
      htmlTemplate: config.htmlTemplate,
    };
  }
  delete config.theme;
  delete config.htmlTemplate;

  config.plugins = [pluginHighlight].concat(config.plugins.map(
    (plugin) => isRelative(plugin) ? path.join(process.cwd(), plugin) : plugin
  ));

  return config;
};
