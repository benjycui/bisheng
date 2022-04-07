const fs = require('fs');
const path = require('path');
const sourceData = require('../utils/source-data');
const resolvePlugins = require('../utils/resolve-plugins');
const context = require('../context');
const boss = require('./common/boss');

module.exports = function bishengDataLoader(/* content */) {
  if (this.cacheable) {
    this.cacheable();
  }

  const { bishengConfig, themeConfig } = context;

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
          isBuild: context.isBuild,
          callback(err, result) {
            const parsedMarkdown = eval(`(${result})`); // eslint-disable-line no-eval

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
        lazyLoad: themeConfig.lazyLoad,
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
