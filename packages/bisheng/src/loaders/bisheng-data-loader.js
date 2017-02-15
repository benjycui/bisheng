const fs = require('fs');
const path = require('path');
const loaderUtils = require('loader-utils');
const getBishengConfig = require('../utils/get-bisheng-config');
const getThemeConfig = require('../utils/get-theme-config');
const sourceData = require('../utils/source-data');
const resolvePlugins = require('../utils/resolve-plugins');
const boss = require('./common/boss');

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

  const markdown = sourceData.generate(bishengConfig.source, bishengConfig.transformers);
  const browserPlugins = resolvePlugins(themeConfig.plugins, 'browser');
  const pluginsString = browserPlugins
          .map(plugin => `[require('${plugin[0]}'), ${JSON.stringify(plugin[1])}]`)
          .join(',\n');

  const callback = this.async();

  const picked = {};
  const pickedPromises = []; // Flag to remind loader that job is done.
  if (themeConfig.pick) {
    const nodePlugins = resolvePlugins(themeConfig.plugins, 'node');
    sourceData.traverse(markdown, (filename) => {
      const fileContent = fs.readFileSync(path.join(process.cwd(), filename)).toString();
      pickedPromises.push(new Promise((resolve) => {
        boss.queue({
          filename,
          content: fileContent,
          plugins: nodePlugins,
          transformers: bishengConfig.transformers,
          isBuild: query.isBuild,
          callback(err, result) {
            const parsedMarkdown = JSON.parse(result);

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

            resolve();
          },
        });
      }));
    });
  }

  Promise.all(pickedPromises)
    .then(() => {
      const sourceDataString = sourceData.stringify(markdown, {
        configFile: query.config,
        lazyLoad: themeConfig.lazyLoad,
        isSSR,
        isBuild: query.isBuild,
      });
      callback(
        null,
        'module.exports = {' +
          `\n  markdown: ${sourceDataString},` +
          `\n  picked: ${JSON.stringify(picked, null, 2)},` +
          `\n  plugins: [\n${pluginsString}\n],` +
          '\n};',
      );
    });
};
