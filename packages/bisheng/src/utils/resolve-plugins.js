

const path = require('path');
const R = require('ramda');
const loaderUtils = require('loader-utils');
const resolve = require('resolve');
const { escapeWinPath } = require('./escape-win-path');

function resolvePlugin(plugin) {
  let result;
  try {
    result = resolve.sync(plugin, {
      basedir: process.cwd(),
    });
  } catch (e) {} // eslint-disable-line no-empty
  return result;
}

module.exports = function resolvePlugins(plugins, moduleName) {
  return plugins.map((plugin) => {
    const snippets = plugin.split('?');
    const pluginName = path.join(snippets[0], 'lib', moduleName);
    const pluginQuery = snippets[1] ? loaderUtils.parseQuery(`?${snippets[1]}`) : {};
    const resolvedPlugin = resolvePlugin(pluginName);
    if (!resolvedPlugin) {
      return false;
    }
    return [
      escapeWinPath(resolvedPlugin),
      pluginQuery,
    ];
  }).filter(R.identity);
};
