const assert = require('assert');
const node = require('../lib/node');

function getMarkdownData(lang) {
  return {
    content: [
      'article',
      [
        'pre',
        {
          lang,
        },
        [
          'code',
          'import { Button } from \'antd\';\n'
            + 'ReactDOM.render(\n'
            + '  <div>\n'
            + '    <Button>Default</Button>\n'
            + '  </div>\n'
            + ', mountNode);',
        ],
      ],
    ],
  };
}

function getEs6MarkdownData(lang) {
  return {
    content: [
      'article',
      [
        'pre',
        {
          lang,
        },
        [
          'code',
          'import { Button } from \'antd\';\n'
          + 'export default () => (\n'
          + '  <div>\n'
          + '    <Button>Default</Button>\n'
          + '  </div>\n'
          + ');\n',
        ],
      ],
    ],
  };
}

describe('bisheng-plugin-react', () => {
  it('should work', (done) => {
    const markdownData = getMarkdownData('react-example');
    assert.deepEqual(node(markdownData, {}), {
      content: [
        'article',
        {
          __BISHENG_EMBEDED_CODE: true,
          code:
            'function bishengPluginReactPreviewer() {\n'
            + '  var React = require("react");\n\n'
            + '  var ReactDOM = require("react-dom");\n\n'
            + '  var _antd = require("antd");\n\n'
            + '  return /*#__PURE__*/React.createElement('
            + '"div",'
            + ' null,'
            + ' /*#__PURE__*/React.createElement('
            + '_antd.Button,'
            + ' null,'
            + ' "Default"'
            + ')'
            + ');\n'
            + '}',
        },
      ],
    });
    done();
  });

  it('should support es6', (done) => {
    const markdownData = getEs6MarkdownData('react-example');
    assert.deepEqual(node(markdownData, {}), {
      content: [
        'article',
        {
          __BISHENG_EMBEDED_CODE: true,
          code:
              'function bishengPluginReactPreviewer() {\n'
              + '  var React = require("react");\n\n'
              + '  var ReactDOM = require("react-dom");\n\n'
              + '  var _antd = require("antd");\n\n'
              + '  var _default = function _default() {\n'
              + '    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_antd.Button, null, "Default"));\n'
              + '  };\n\n'
              + '  return /*#__PURE__*/React.createElement(_default);\n'
              + '}',
        },
      ],
    });
    done();
  });
});
