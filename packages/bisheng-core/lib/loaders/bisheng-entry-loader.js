'use strict';

const path = require('path');
const nunjucks = require('nunjucks');
const loaderUtils = require('loader-utils');
const getConfig = require('../utils/get-config');

module.exports = function bishengEntryLoader(content) {
  if (this.cacheable) {
    this.cacheable();
  }

  const query = loaderUtils.parseQuery(this.query);
  const config = getConfig(query.config);
  const themePath = path.join(process.cwd(), config.theme);
  const root = query.isBuild === true ? config.root : '/';

  return nunjucks.renderString(content, { themePath, root });
};
