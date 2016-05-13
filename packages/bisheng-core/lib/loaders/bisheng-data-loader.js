'use strict';

const loaderUtils = require('loader-utils');
const getConfig = require('../utils/get-config');
const markdownData = require('../utils/markdown-data');
const resolvePlugins = require('../utils/resolve-plugins');

module.exports = function bishengDataLoader(/* content */) {
  if (this.cacheable) {
    this.cacheable();
  }

  const query = loaderUtils.parseQuery(this.query);
  const config = getConfig(query.config);

  const markdown = markdownData.generate(config.source);
  const plugins = resolvePlugins(config.plugins, true);
  const pluginsString = plugins.map(
    (plugin) =>
      `require('${plugin[0]}')(${JSON.stringify(plugin[1])})`
  ).join(',\n');

  return 'module.exports = {' +
    `\n  markdown: ${markdownData.stringify(markdown)},` +
    `\n  plugins: [\n${pluginsString}\n],` +
    `\n};`;
};
