'use strict';

const loaderUtils = require('loader-utils');
const generator = require('babel-generator').default;
const transformer = require('./transformer');

module.exports = function jsonmlReactLoader(content) {
  if (this.cacheable) {
    this.cacheable();
  }

  const query = loaderUtils.parseQuery(this.query);
  const lang = query.lang || 'react-example';

  const res = transformer(content, lang);
  const inputAst = res.inputAst;
  const imports = res.imports;
  for (let k = 0; k < imports.length; k++) {
    inputAst.program.body.unshift(imports[k]);
  }

  const code = generator(inputAst, null, content).code;

  const noreact = query.noreact;
  if (noreact) {
    return code;
  }
  return 'import React from \'react\';\n' +
    'import ReactDOM from \'react-dom\';\n' +
    code;
};
