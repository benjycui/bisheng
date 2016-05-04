const loaderUtils = require('loader-utils');
const markTwain = require('mark-twain');
const getConfig = require('../utils/get-config');
const resolvePlugins = require('../utils/resolve-plugins');

module.exports = function markdownLoader(content) {
  if (this.cacheable) {
    this.cacheable();
  }

  const query = loaderUtils.parseQuery(this.query);
  const plugins = resolvePlugins(getConfig(query.config).plugins);

  const parsedMarkdown = plugins.reduce(
    (markdownData, plugin) =>
      plugin[0](markdownData, plugin[1]),
    markTwain(content)
  );

  return `module.exports = ${JSON.stringify(parsedMarkdown, null, 2)};`;
};
