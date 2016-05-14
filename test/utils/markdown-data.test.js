'use strict';

const assert = require('assert');
const path = require('path');
const markdownData = require('../../lib/utils/markdown-data');

describe('utils/markdown-data', function() {
  describe('#generate', function() {
    it('should generate a files tree from `config.source`', function() {
      const filesTree = markdownData.generate('./test/fixtures/posts');
      assert.deepEqual(filesTree, {
        test: {
          fixtures: {
            posts: {
              'a.md': 'test/fixtures/posts/a.md',
              'b.md': 'test/fixtures/posts/b.md',
            },
          },
        },
      });
    });
  });

  describe('#stringify', function() {
    it('should stringify value to `require` sentence', function() {
      const filesTree = markdownData.generate('./test/fixtures/posts');
      const stringified = markdownData.stringify(filesTree);
      assert.strictEqual(stringified, '{\n' +
                         '  \'test\': {\n' +
                         '    \'fixtures\': {\n' +
                         '      \'posts\': {\n' +
                         `        'a': require('${path.join(__dirname, '../fixtures/posts/a.md')}'),\n` +
                         `        'b': require('${path.join(__dirname, '../fixtures/posts/b.md')}'),\n` +
                         '      },\n' +
                         '    },\n' +
                         '  },\n' +
                         '}');
    });
  });
});
