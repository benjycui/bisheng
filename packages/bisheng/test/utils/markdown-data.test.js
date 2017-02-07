const assert = require('assert');
const path = require('path');
const { escapeWinPath } = require('../../src/utils/escape-win-path');
const markdownData = require('../../lib/utils/markdown-data');

const pathSep = path.sep;
const sourcePath = './test/fixtures/posts';

describe('bisheng/utils/markdown-data', () => {
  describe('#generate', () => {
    it.skip('should generate a files tree from `config.source`', () => {
      const filesTree = markdownData.generate(sourcePath);
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

    it.skip('should generate a files tree from `config.source`', () => {
      const filesTree = markdownData.generate([sourcePath]);
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

    it.skip('should generate files trees while `config.source` is an object', () => {
      const filesTree = markdownData.generate({ mockData: sourcePath });
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

  describe('#stringify', () => {
    it.skip('should stringify value to `require` sentence', () => {
      const filesTree = markdownData.generate(sourcePath);
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
