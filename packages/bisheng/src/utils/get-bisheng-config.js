'use strict';

const fs = require('fs');
const path = require('path');
const resolve = require('resolve');

const defaultConfig = {
  port: 8000,
  source: './posts',
  output: './_site',
  theme: './_theme',
  htmlTemplate: path.join(__dirname, '../template.html'),
  doraConfig: {},
  webpackConfig(config) {
    return config;
  },

  entryName: 'index',
  root: '/',
  filePathMapper(filePath) {
    return filePath;
  },
};

module.exports = function getBishengConfig(configFile) {
  const customizedConfig = fs.existsSync(configFile) ? require(configFile) : {};
  const config = Object.assign({}, defaultConfig, customizedConfig);
  config.theme = resolve.sync(config.theme, { basedir: process.cwd() });
  return config;
};
