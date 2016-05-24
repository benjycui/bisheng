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
      [ 'li', [ 'a', { href: '#Heading' }, 'Heading' ] ],
      [ 'li', [ 'a', { href: '#Heading' }, 'Heading' ] ],
    ]);
  });
});
