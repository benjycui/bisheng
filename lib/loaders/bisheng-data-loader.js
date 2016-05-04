const path = require('path');
const loaderUtils = require('loader-utils');
const getConfig = require('../utils/get-config');
const generateMarkdownData = require('../utils/generate-markdown-data');
const resolvePlugins = require('../utils/resolve-plugins');

module.exports = function bishengDataLoader(/* content */) {
  if (this.cacheable) {
    this.cacheable();
  }

  const query = loaderUtils.parseQuery(this.query);
  const config = getConfig(query.config);
  const themePath = `${process.cwd()}${path.sep}${config.theme}`;

  const markdownData = generateMarkdownData(config.source, config.extension);
  const plugins = resolvePlugins(config.plugins, true);

  return 'module.exports = {' +
    `\n  markdown: ${markdownData},` +
    `\n  theme: require('${themePath}'),` +
    `\n  notFound: require('${themePath}${path.sep}template${path.sep}NotFound'),` +
    `\n  plugins: ${JSON.stringify(plugins, null, 2)},` +
    `\n};`;
};
