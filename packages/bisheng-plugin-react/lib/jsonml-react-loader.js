'use strict';

const loaderUtils = require('loader-utils');
const babylon = require('babylon');
const types = require('babel-types');
const generator = require('babel-generator').default;
const traverse = require('babel-traverse').default;

function parser(content) {
  return babylon.parse(content, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'flow',
      'asyncFunctions',
      'classConstructorCall',
      'doExpressions',
      'trailingFunctionCommas',
      'objectRestSpread',
      'decorators',
      'classProperties',
      'exportExtensions',
      'exponentiationOperator',
      'asyncGenerators',
      'functionBind',
      'functionSent',
    ],
  });
}

module.exports = function jsonmlReactLoader(content) {
  if (this.cacheable) {
    this.cacheable();
  }

  const query = loaderUtils.parseQuery(this.query);
  const lang = query.lang || 'react-example';
  const noreact = query.noreact;

  let imports = [];

  const inputAst = parser(content);

  traverse(inputAst, {
    ArrayExpression: function(path) {
      const node = path.node;
      const firstItem = node.elements[0];
      const secondItem = node.elements[1];
      let renderReturn;
      if (firstItem &&
        firstItem.type === 'StringLiteral' &&
        firstItem.value === 'pre' &&
        secondItem.properties[0].value.value === lang) {
        let codeNode = node.elements[2].elements[1];
        let code = codeNode.value;

        const codeAst = parser(code);

        traverse(codeAst, {
          ImportDeclaration: function(importPath) {
            imports.push(importPath.node);
            importPath.remove();
          },
          CallExpression: function(CallPath) {
            const CallPathNode = CallPath.node;
            if (CallPathNode.callee &&
              CallPathNode.callee.object &&
              CallPathNode.callee.object.name === 'ReactDOM' &&
              CallPathNode.callee.property &&
              CallPathNode.callee.property.name === 'render') {

              renderReturn = types.returnStatement(
                CallPathNode.arguments[0]
              );

              CallPath.remove();
            }
          },
        });

        const astProgramBody = codeAst.program.body;
        const codeBlock = types.BlockStatement(astProgramBody);

        // ReactDOM.render always at the last of preview method
        if (renderReturn) {
          astProgramBody.push(renderReturn);
        }

        const coceFunction = types.functionExpression(null, [], codeBlock);
        path.replaceWith(coceFunction);
      }
    },
  });

  for (let k = 0; k < imports.length; k++) {
    inputAst.program.body.unshift(imports[k]);
  }

  const code = generator(inputAst, null, content).code;
  if (noreact) {
    return code;
  }
  return 'import React from \'react\';\n' +
    'import ReactDOM from \'react-dom\';\n' +
    code;
};
