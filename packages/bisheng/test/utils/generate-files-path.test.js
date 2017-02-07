

const assert = require('assert');
const generateFilesPath = require('../../lib/utils/generate-files-path');

describe('bisheng/utils/generate-files-path', () => {
  it('should add 404.html by default', () => {
    const result = generateFilesPath([], {});
    assert.deepEqual(result, ['/404.html']);
  });

  it('should add index.html to each directory', () => {
    const result = generateFilesPath([{ path: '/' }], {});
    assert.deepEqual(result, ['/index.html', '/404.html']);
  });

  it('should generate corresponding html file to each file', () => {
    const result = generateFilesPath([{ path: '/archive' }], {});
    assert.deepEqual(result, ['/archive.html', '/404.html']);
  });

  it('should generate corresponding html file to each markdown data', () => {
    const result = generateFilesPath([{
      path: '/:post',
      dataPath: '/:post',
    }], {
      hello: {},
      bye: {},
    });
    assert.deepEqual(result, ['/hello.html', '/bye.html', '/404.html']);
  });
});
