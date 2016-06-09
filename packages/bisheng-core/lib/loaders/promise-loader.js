'use strict';

module.exports = function bishengPromiseLoader() {
  if (this.cacheable) {
    this.cacheable();
  }
  const fullPath = this.query.substring(1);
  const result =
    `var Promise = require('${require.resolve('bluebird')}');\n` +
    'module.exports = function () {\n' +
    '  return new Promise(function (resolve) {\n' +
    '    require.ensure([], function (require) {\n' +
    `      resolve(require(\'${fullPath}\'));\n` +
    '    });\n' +
    '  });\n' +
    '}';

  return result;
};
