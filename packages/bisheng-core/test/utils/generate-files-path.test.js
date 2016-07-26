'use strict';

const assert = require('assert');
const generateFilesPath = require('../../lib/utils/generate-files-path');

describe('utils/generate-files-path', function() {
  it('should add 404.html by default', function() {
    const result = generateFilesPath([], {});
    assert.deepEqual(result, ['/404.html']);
  });

  it('should add index.html to each directory', function() {
    const result = generateFilesPath([{ path: '/' }], {});
    assert.deepEqual(result, ['/index.html', '/404.html']);
  });

  it('should generate corresponding html file to each file', function() {
    const result = generateFilesPath([{ path: '/archive' }], {});
    assert.deepEqual(result, ['/archive.html', '/404.html']);
  });

  it('should generate corresponding html file to each markdown data', function() {
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
