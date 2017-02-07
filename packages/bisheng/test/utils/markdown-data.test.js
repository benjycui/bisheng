'use strict';

const assert = require('assert');
const path = require('path');
const {escapeWinPath} = require('../../src/utils/escape-win-path');
const markdownData = require('../../lib/utils/markdown-data');
const pathSep = path.sep;

describe('utils/markdown-data', function() {
  describe('#generate', function() {
    it('should generate a files tree from `config.source`', function() {
      const filesTree = markdownData.generate('./test/fixtures/posts');
      assert.deepEqual(filesTree, {
        test: {
          fixtures: {
            posts: {
              a: {
                'en-US': `test${(pathSep)}fixtures${(pathSep)}posts${(pathSep)}a.en-US.md`,
                'zh-CN': `test${(pathSep)}fixtures${(pathSep)}posts${(pathSep)}a.zh-CN.md`,
              },
              b: `test${(pathSep)}fixtures${(pathSep)}posts${(pathSep)}b.md`,
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
                'en-US': `test${(path.sep)}fixtures${(pathSep)}posts${(pathSep)}a.en-US.md`,
                'zh-CN': `test${(path.sep)}fixtures${(pathSep)}posts${(pathSep)}a.zh-CN.md`,
              },
              b: `test${(path.sep)}fixtures${(pathSep)}posts${(pathSep)}b.md`,
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
                  'en-US': `test${(path.sep)}fixtures${(pathSep)}posts${(pathSep)}a.en-US.md`,
                  'zh-CN': `test${(path.sep)}fixtures${(pathSep)}posts${(pathSep)}a.zh-CN.md`,
                },
                b: `test${(path.sep)}fixtures${(pathSep)}posts${(pathSep)}b.md`,
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
                         `          'en-US': require('${escapeWinPath(path.join(__dirname, '../fixtures/posts/a.en-US.md'))}'),\n` +
                         `          'zh-CN': require('${escapeWinPath(path.join(__dirname, '../fixtures/posts/a.zh-CN.md'))}'),\n` +
                         '        },\n' +
                         `        'b': require('${escapeWinPath(path.join(__dirname, '../fixtures/posts/b.md'))}'),\n` +
                         '      },\n' +
                         '    },\n' +
                         '  },\n' +
                         '}');
    });
  });
});
