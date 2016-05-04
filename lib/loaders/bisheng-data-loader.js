const loaderUtils = require('loader-utils');
const getConfig = require('../utils/get-config');
const generateDataFile = require('../utils/generate-data-file');

module.exports = function bishengDataLoader(/* content */) {
  if (this.cacheable) {
    this.cacheable();
  }
  const query = loaderUtils.parseQuery(this.query);
  const config = getConfig(query.config);
  return generateDataFile(config.source, config.extension);
};
