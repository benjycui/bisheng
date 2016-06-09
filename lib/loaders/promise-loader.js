'use strict';

const loaderUtils = require('loader-utils');

module.exports = () => {};
module.exports.pitch = function bisengPromiseLoader(remainingRequest) {
  if (this.cacheable) {
    this.cacheable();
  }

  const query = loaderUtils.parseQuery(this.query);
  const isBuild = query.isBuild === true;
  const result =
          'var Promise = require(\'bluebird\');\n' +
          'module.exports = function () {\n' +
          '  return new Promise(function (resolve) {\n' +
          (isBuild ? '    require.ensure([], function (require) {\n' : '') +
          `      resolve(require(${JSON.stringify('!!' + remainingRequest)}));\n` +
          (isBuild ? '    });\n' : '') +
          '  });\n' +
          '}';

  return result;
};
