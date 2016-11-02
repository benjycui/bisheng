'use strict';

const path = require('path');
const loaderUtils = require('loader-utils');
const getConfig = require('../utils/get-config');
const resolvePlugins = require('../utils/resolve-plugins');
const markdownData = require('../utils/markdown-data');

function stringify(node) {
  if (Array.isArray(node)) {
    return '[\n  ' +
      node.map(stringify).join(',\n  ') +
      '\n]';
  }
  if (
    typeof node === 'object' &&
      node !== null &&
      !(node instanceof Date)
  ) {
    if (node.__BISHENG_EMBEDED_CODE) {
      return node.code;
    }
    return '{\n  ' +
      Object.keys(node).map((key) => {
        const value = node[key];
        return `  ${key}: ${stringify(value)},\n`;
      }).join('') +
      '\n}';
  }
  return JSON.stringify(node, null, 2);
}

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
  return `module.exports = ${stringify(parsedMarkdown)};`;
};
