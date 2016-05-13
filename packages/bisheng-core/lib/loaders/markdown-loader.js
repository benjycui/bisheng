'use strict';

const path = require('path');
const loaderUtils = require('loader-utils');
const markTwain = require('mark-twain');
const getConfig = require('../utils/get-config');
const resolvePlugins = require('../utils/resolve-plugins');

module.exports = function markdownLoader(content) {
  if (this.cacheable) {
    this.cacheable();
  }
  const webpackRemainingChain = loaderUtils.getRemainingRequest(this).split('!');
  const fullPath = webpackRemainingChain[webpackRemainingChain.length - 1];
  const filename = path.relative(process.cwd(), fullPath);
  const markdown = markTwain(content);
  markdown.meta.filename = filename;

  const query = loaderUtils.parseQuery(this.query);
  const plugins = resolvePlugins(getConfig(query.config).plugins);
  const parsedMarkdown = plugins.reduce(
    (markdownData, plugin) =>
      require(plugin[0])(markdownData, plugin[1]),
    markdown
  );

  return `module.exports = ${JSON.stringify(parsedMarkdown, null, 2)};`;
};
