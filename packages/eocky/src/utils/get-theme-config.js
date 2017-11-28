const path = require('path');
// TODO: 处理预置插件
const pluginHighlight = path.join(__dirname, '..', 'bisheng-plugin-highlight');

function isRelative(filepath) {
  return filepath.charAt(0) === '.';
}

function toAbsolutePath(plugin) {
  return isRelative(plugin) ? path.join(process.cwd(), plugin) : plugin;
}

module.exports = function getThemeConfig(configFile) {
  const nodeConfigFile = path.join(configFile, '..', 'config.js');
  const customizedConfig = require(nodeConfigFile);
  const config = Object.assign({ plugins: [] }, customizedConfig);
  config.plugins = [pluginHighlight].concat(config.plugins.map(toAbsolutePath));

  return config;
};
