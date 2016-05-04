const path = require('path');
const loaderUtils = require('loader-utils');
const getConfig = require('../utils/get-config');
const generateMarkdownData = require('../utils/generate-markdown-data');

module.exports = function bishengDataLoader(/* content */) {
  if (this.cacheable) {
    this.cacheable();
  }
  const query = loaderUtils.parseQuery(this.query);
  const config = getConfig(query.config);
  return `module.exports = {` +
    `\n  markdown: ${generateMarkdownData(config.source, config.extension)},` +
    `\n  theme: require('${process.cwd()}${path.sep}${config.theme}'),` +
    `\n};`;
};
