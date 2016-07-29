'use strict';

const assert = require('assert');
const addToc = require('../lib/node');

const fs = require('fs');
const MT = require('mark-twain');
const markdownData = MT(fs.readFileSync('./test/fixtures.md').toString());

describe('./lib/node.js', function() {
  it('should add `toc` to markdownData', function() {
    const data = addToc(markdownData, {});
    assert.ok('toc' in data);
  });

  it('should ignore heading which depth is greater than `config.maxDepth`', function() {
    const data = addToc(markdownData, { maxDepth: 2 });
    assert.deepEqual(data.toc, [
      'ul',
      [ 'li', [ 'a', { className: 'bisheng-toc-h1', href: '#Heading1' }, 'Heading1' ] ],
      [ 'li', [ 'a', { className: 'bisheng-toc-h2', href: '#Heading2' }, 'Heading2' ] ],
    ]);
  });

  it('should generate slugged id', function() {
    const data = addToc(markdownData, { maxDepth: 3 });
    assert.deepEqual(data.toc.slice(4), [
      [ 'li', [ 'a', { className: 'bisheng-toc-h3', href: '#hello-world' }, 'hello world'] ],
      [ 'li', [ 'a', { className: 'bisheng-toc-h3', href: '#hello-world' }, 'hello world'] ],
    ]);
  });

  it('should keep elements in heading text', function() {
    const data = addToc(markdownData, { maxDepth: 3, keepElem: true });
    assert.deepEqual(data.toc.slice(4), [
      [ 'li', [ 'a', { className: 'bisheng-toc-h3', href: '#hello-world' }, 'hello world'] ],
      [ 'li', [ 'a', { className: 'bisheng-toc-h3', href: '#hello-world' }, 'hello ', [ 'a', { href: './world', title: null}, 'world'] ] ],
    ]);
  });
});
