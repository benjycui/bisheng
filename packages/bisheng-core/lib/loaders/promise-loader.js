'use strict';

const loaderUtils = require('loader-utils');
const path = require('path');

module.exports = () => {};
module.exports.pitch = function bisengPromiseLoader(remainingRequest) {
  if (this.cacheable) {
    this.cacheable();
  }

  const query = loaderUtils.parseQuery(this.query);
  const isBuild = query.isBuild === true;

  const webpackRemainingChain = remainingRequest.split('!');
  const fullPath = webpackRemainingChain[webpackRemainingChain.length - 1];
  const filename = path.relative(process.cwd(), fullPath);

  const result =
          'var Promise = require(\'bluebird\');\n' +
          'module.exports = function () {\n' +
          '  return new Promise(function (resolve) {\n' +
          // '    require.ensure([], function (require) {\n' +
          (isBuild ? '    require.ensure([], function (require) {\n' : '') +
          `      resolve(require(${JSON.stringify('!!' + remainingRequest)}));\n` +
          (isBuild ? `    }, '${filename}');\n` : '') +
          // `    }, '${filename}');\n` +
          '  });\n' +
          '}';

  return result;
};
