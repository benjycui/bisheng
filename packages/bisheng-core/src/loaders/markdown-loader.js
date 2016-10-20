'use strict';

const path = require('path');
const loaderUtils = require('loader-utils');
const getConfig = require('../utils/get-config');
const resolvePlugins = require('../utils/resolve-plugins');
const markdownData = require('../utils/markdown-data');

module.exports = function markdownLoader(content) {
  if (this.cacheable) {
    this.cacheable();
  }
  const webpackRemainingChain = loaderUtils.getRemainingRequest(this).split('!');
  const fullPath = webpackRemainingChain[webpackRemainingChain.length - 1];
  const filename = path.relative(process.cwd(), fullPath);

  const query = loaderUtils.parseQuery(this.query);
  const plugins = resolvePlugins(getConfig(query.config).plugins, 'node');

  const parsedMarkdown = markdownData.process(filename, content, plugins, query.isBuild);
  return `module.exports = ${JSON.stringify(parsedMarkdown, null, 2)};`;
};
