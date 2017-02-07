'use strict';

const fs = require('fs');
const path = require('path');
const loaderUtils = require('loader-utils');
const getBishengConfig = require('../utils/get-bisheng-config');
const getThemeConfig = require('../utils/get-theme-config');
const markdownData = require('../utils/markdown-data');
const resolvePlugins = require('../utils/resolve-plugins');

module.exports = function bishengDataLoader(/* content */) {
  if (this.cacheable) {
    this.cacheable();
  }

  const webpackRemainingChain = loaderUtils.getRemainingRequest(this).split('!');
  const fullPath = webpackRemainingChain[webpackRemainingChain.length - 1];
  const isSSR = fullPath.endsWith('ssr-data.js');

  const query = loaderUtils.parseQuery(this.query);
  const bishengConfig = getBishengConfig(query.config);
  const themeConfig = getThemeConfig(bishengConfig.theme);

  const markdown = markdownData.generate(bishengConfig.source);
  const browserPlugins = resolvePlugins(themeConfig.plugins, 'browser');
  const pluginsString = browserPlugins.map(
    (plugin) =>
      `require('${plugin[0]}')(${JSON.stringify(plugin[1])})`
  ).join(',\n');

  const picked = {};
  if (themeConfig.pick) {
    const nodePlugins = resolvePlugins(themeConfig.plugins, 'node');
    markdownData.traverse(markdown, (filename) => {
      const fileContent = fs.readFileSync(path.join(process.cwd(), filename)).toString();
      const parsedMarkdown = markdownData.process(filename, fileContent, nodePlugins, query.isBuild);

      Object.keys(themeConfig.pick).forEach((key) => {
        if (!picked[key]) {
          picked[key] = [];
        }

        const picker = themeConfig.pick[key];
        const pickedData = picker(parsedMarkdown);
        if (pickedData) {
          picked[key].push(pickedData);
        }
      });
    });
  }

  return 'module.exports = {' +
    `\n  markdown: ${markdownData.stringify(markdown, themeConfig.lazyLoad, isSSR)},` +
    `\n  plugins: [\n${pluginsString}\n],` +
    `\n  picked: ${JSON.stringify(picked, null, 2)},` +
    `\n};`;

};
