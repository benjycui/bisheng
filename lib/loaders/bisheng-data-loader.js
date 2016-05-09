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

  const markdownData = generateMarkdownData(config.source, config.extension);
  const plugins = resolvePlugins(config.plugins, true);
  const pluginsString = plugins.map(
    (plugin) =>
      `require('${plugin[0]}')(${JSON.stringify(plugin[1])})`
  ).join(',\n');

  return 'module.exports = {' +
    `\n  markdown: ${markdownData},` +
    `\n  plugins: [\n${pluginsString}\n],` +
    `\n};`;
};
