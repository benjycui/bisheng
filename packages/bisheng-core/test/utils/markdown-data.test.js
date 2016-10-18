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
              a: {
                'en-US': 'test/fixtures/posts/a.en-US.md',
                'zh-CN': 'test/fixtures/posts/a.zh-CN.md',
              },
              b: 'test/fixtures/posts/b.md',
            },
          },
        },
      });
    });

    it('should generate a files tree from `config.source`', function() {
      const filesTree = markdownData.generate(['./test/fixtures/posts']);
      assert.deepEqual(filesTree, {
        test: {
          fixtures: {
            posts: {
              a: {
                'en-US': 'test/fixtures/posts/a.en-US.md',
                'zh-CN': 'test/fixtures/posts/a.zh-CN.md',
              },
              b: 'test/fixtures/posts/b.md',
            },
          },
        },
      });
    });

    it('should generate files trees while `config.source` is an object', function() {
      const filesTree = markdownData.generate({ mockData: './test/fixtures/posts' });
      assert.deepEqual(filesTree, {
        mockData: {
          test: {
            fixtures: {
              posts: {
                a: {
                  'en-US': 'test/fixtures/posts/a.en-US.md',
                  'zh-CN': 'test/fixtures/posts/a.zh-CN.md',
                },
                b: 'test/fixtures/posts/b.md',
              },
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
                         '        \'a\': {\n' +
                         `          'en-US': require('${path.join(__dirname, '../fixtures/posts/a.en-US.md')}'),\n` +
                         `          'zh-CN': require('${path.join(__dirname, '../fixtures/posts/a.zh-CN.md')}'),\n` +
                         '        },\n' +
                         `        'b': require('${path.join(__dirname, '../fixtures/posts/b.md')}'),\n` +
                         '      },\n' +
                         '    },\n' +
                         '  },\n' +
                         '}');
    });
  });
});
