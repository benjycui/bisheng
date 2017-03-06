const fs = require('fs');
const path = require('path');
const resolve = require('resolve');

const markdownTransformer = path.join(__dirname, '..', 'transformers', 'markdown');

const defaultConfig = {
  port: 8000,
  source: './posts',
  exclude: null,
  output: './_site',
  theme: './_theme',
  htmlTemplate: path.join(__dirname, '../template.html'),
  transformers: [],
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
  config.transformers = config.transformers.concat({
    test: /\.md$/,
    use: markdownTransformer,
  }).map(({ test, use }) => ({
    test: test.toString(), // Hack, for we cannot send RegExp to child process
    use,
  }));
  return config;
};
