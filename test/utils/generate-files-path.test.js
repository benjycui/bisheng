'use strict';

const assert = require('assert');
const generateFilesPath = require('../../lib/utils/generate-files-path');

describe('utils/generate-files-path', function() {
  it('should add 404.html by default', function() {
    const result = generateFilesPath([], {});
    assert.deepEqual(result, [{ path: '/404.html', title: '404 Not Found' }]);
  });

  it('should add index.html to each directory', function() {
    const result = generateFilesPath([{ path: '/' }], {});
    assert.deepEqual(result, [{
      path: '/index.html',
      title: '',
      content: '',
    }, {
      path: '/404.html',
      title: '404 Not Found',
    }]);
  });

  it('should generate corresponding html file to each file', function() {
    const result = generateFilesPath([{ path: '/archive' }], {});
    assert.deepEqual(result, [{
      path: '/archive.html',
      title: 'Archive',
      content: '',
    }, {
      path: '/404.html',
      title: '404 Not Found',
    }]);
  });

  it('should generate corresponding html file to each markdown data', function() {
    const result = generateFilesPath([{
      path: '/:post',
      dataPath: '/:post',
    }], {
      hello: {},
      bye: {},
    });
    assert.deepEqual(result, [{
      path: '/hello.html', title: 'Hello', content: '',
    }, {
      path: '/bye.html', title: 'Bye', content: '',
    }, {
      path: '/404.html', title: '404 Not Found',
    }]);
  });
});
