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
            + '  return React.createElement('
            + '"div",'
            + ' null,'
            + ' React.createElement('
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
});
