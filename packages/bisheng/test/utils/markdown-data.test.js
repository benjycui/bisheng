const assert = require('assert');
const path = require('path');
const { escapeWinPath } = require('../../lib/utils/escape-win-path');
const markdownData = require('../../lib/utils/markdown-data');

const sourcePath = path.join(__dirname, '../fixtures/posts');

describe('bisheng/utils/markdown-data', () => {
  describe('#generate', () => {
    it('should generate a files tree from `config.source`', () => {
      const filesTree = markdownData.generate(sourcePath);
      assert.deepEqual(filesTree, {
        a: {
          'en-US': path.join(sourcePath, 'a.en-US.md'),
          'zh-CN': path.join(sourcePath, 'a.zh-CN.md'),
        },
        b: path.join(sourcePath, 'b.md'),
      });
    });

    it('should generate a files tree from `config.source`', () => {
      const filesTree = markdownData.generate([sourcePath]);
      assert.deepEqual(filesTree, {
        a: {
          'en-US': path.join(sourcePath, 'a.en-US.md'),
          'zh-CN': path.join(sourcePath, 'a.zh-CN.md'),
        },
        b: path.join(sourcePath, 'b.md'),
      });
    });

    it('should generate files trees while `config.source` is an object', () => {
      const filesTree = markdownData.generate({ mockData: sourcePath });
      assert.deepEqual(filesTree, {
        mockData: {
          a: {
            'en-US': path.join(sourcePath, 'a.en-US.md'),
            'zh-CN': path.join(sourcePath, 'a.zh-CN.md'),
          },
          b: path.join(sourcePath, 'b.md'),
        },
      });
    });
  });

  describe('#stringify', () => {
    it('should stringify value to `require` sentence', () => {
      const filesTree = markdownData.generate(sourcePath);
      const stringified = markdownData.stringify(filesTree);
      assert.strictEqual(stringified, '{\n' +
                         '  \'a\': {\n' +
                         `    'en-US': require('${escapeWinPath(path.join(sourcePath, 'a.en-US.md'))}'),\n` +
                         `    'zh-CN': require('${escapeWinPath(path.join(sourcePath, 'a.zh-CN.md'))}'),\n` +
                         '  },\n' +
                         `  'b': require('${escapeWinPath(path.join(sourcePath, 'b.md'))}'),\n` +
                         '}');
    });
  });
});
