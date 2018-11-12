const path = require('path');
const loaderUtils = require('loader-utils');
const resolvePlugins = require('../utils/resolve-plugins');
const context = require('../context');
const boss = require('./common/boss');

module.exports = function sourceLoader(content) {
  if (this.cacheable) {
    this.cacheable();
  }
  const webpackRemainingChain = loaderUtils.getRemainingRequest(this).split('!');
  const fullPath = webpackRemainingChain[webpackRemainingChain.length - 1];
  const filename = path.relative(process.cwd(), fullPath);

  const { bishengConfig, themeConfig } = context;
  const plugins = resolvePlugins(themeConfig.plugins, 'node');

  const callback = this.async();
  boss.queue({
    filename,
    content,
    plugins,
    transformers: bishengConfig.transformers,
    isBuild: context.isBuild,
    callback(err, result) {
      callback(err, `module.exports = ${result};`);
    },
  });
};
