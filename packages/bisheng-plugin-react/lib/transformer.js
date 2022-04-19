const babel = require('@babel/core');
const types = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

const errorBoxStyle = {
  padding: 10,
  background: 'rgb(204, 0, 0)',
  color: 'white',
  fontFamily: 'sans-serif',
  fontSize: '16px',
  fontWeight: 'bold',
  overflow: 'auto',
};

function requireGenerator(varName, moduleName) {
  return types.variableDeclaration('var', [
    types.variableDeclarator(
      types.identifier(varName),
      types.callExpression(types.identifier('require'), [
        types.stringLiteral(moduleName),
      ]),
    ),
  ]);
}
const defaultBabelConfig = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 8',
            'iOS >= 8',
            'Android >= 4',
          ],
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      { isTSX: true },
    ],
    [
      '@babel/plugin-proposal-decorators',
      { decoratorsBeforeExport: true },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
};

module.exports = function transformer(code, babelConfig = {}, noreact) {
  let codeAst = null;

  try {
    const parserOpts = {
      ast: true,
      babelrc: false,
      configFile: false,
      ...defaultBabelConfig,
      ...babelConfig,
    };
    //  parseSync
    const { ast } = babel.transformSync(
      code,
      parserOpts,
    );
    codeAst = ast;
  } catch (e) {
    console.error(e);
    return (
      'function() { '
      + "  var React = require('react');"
      + "  return React.createElement('pre', {"
      + `    style: ${JSON.stringify(errorBoxStyle)}`
      + `  }, '${e.toString()}'); `
      + '}'
    );
  }

  let renderReturn = null;
  traverse(codeAst, {
    CallExpression(callPath) {
      const callPathNode = callPath.node;
      if (
        callPathNode.callee
        && callPathNode.callee.object
        && callPathNode.callee.object.name === 'ReactDOM'
        && callPathNode.callee.property
        && callPathNode.callee.property.name === 'render'
      ) {
        renderReturn = types.returnStatement(callPathNode.arguments[0]);

        callPath.remove();
      } else if (
        callPathNode.callee
        && callPathNode.callee.object
        && callPathNode.callee.object.name === 'Object'
        && callPathNode.callee.property
        && callPathNode.callee.property.name === 'defineProperty'
        && callPathNode.arguments[0].name === 'exports'
      ) {
        callPath.remove();
      }
    },
    AssignmentExpression(path) {
      const pathNode = path.node;
      if (
        pathNode.operator === '='
        && pathNode.left
        && pathNode.left.object
        && pathNode.left.object.name === 'exports'
        && pathNode.left.property
        && pathNode.left.property.value === 'default'
      ) {
        renderReturn = types.returnStatement(
          types.addComment(
            types.callExpression(
              types.memberExpression(types.identifier('React'), types.identifier('createElement')),
              [types.identifier('_default')],
            ),
            'leading',
            '#__PURE__',
          ),
        );
        path.remove();
      }
    },
  });

  const astProgramBody = codeAst.program.body;
  if (!noreact) {
    astProgramBody.unshift(requireGenerator('ReactDOM', 'react-dom'));
    astProgramBody.unshift(requireGenerator('React', 'react'));
  }
  // ReactDOM.render always at the last of preview method
  if (renderReturn) {
    astProgramBody.push(renderReturn);
  }

  const codeBlock = types.BlockStatement(astProgramBody);
  const previewFunction = types.functionDeclaration(
    types.Identifier('bishengPluginReactPreviewer'),
    [],
    codeBlock,
  );

  return generator(types.program([previewFunction]), {}, code).code;
};
