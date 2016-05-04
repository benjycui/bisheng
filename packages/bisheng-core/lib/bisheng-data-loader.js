const loaderUtils = require('loader-utils');
const getConfig = require('./get-config');
const generateDataFile = require('./generate-data-file');

module.exports = function(content) {
  this.cacheable && this.cacheable();
  const query = loaderUtils.parseQuery(this.query);
  const config = getConfig(query.config);
  return generateDataFile(config.source, config.extension);
};
