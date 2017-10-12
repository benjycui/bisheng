const assert = require('assert');
const addToc = require('../lib/node');
const fs = require('fs');
const path = require('path');
const MT = require('mark-twain');

const markdownData = MT(fs.readFileSync(path.join(__dirname, 'fixtures.md')).toString());

describe('bisheng-plugin-toc', () => {
  it('should add `toc` to markdownData', () => {
    const data = addToc(markdownData, {});
    assert.ok('toc' in data);
  });

  it('should ignore heading which depth is greater than `config.maxDepth`', () => {
    const data = addToc(markdownData, { maxDepth: 2 });
    assert.deepEqual(data.toc, [
      'ul',
      ['li', ['a', { className: 'bisheng-toc-h1', href: '#Heading1', title: 'Heading1' }, 'Heading1']],
      ['li', ['a', { className: 'bisheng-toc-h2', href: '#Heading2', title: 'Heading2' }, 'Heading2']],
    ]);
  });

  it('should generate slugged id', () => {
    const data = addToc(markdownData, { maxDepth: 3 });
    assert.deepEqual(data.toc.slice(4), [
      ['li', ['a', { className: 'bisheng-toc-h3', href: '#hello-world', title: 'hello world' }, 'hello world']],
      ['li', ['a', { className: 'bisheng-toc-h3', href: '#hello-world', title: 'hello world' }, 'hello world']],
    ]);
  });

  it('should keep elements in heading text', () => {
    const data = addToc(markdownData, { maxDepth: 3, keepElem: true });
    assert.deepEqual(data.toc.slice(4), [
      ['li', ['a', { className: 'bisheng-toc-h3', href: '#hello-world', title: 'hello world' }, 'hello world']],
      ['li', ['a', { className: 'bisheng-toc-h3', href: '#hello-world', title: 'hello world' }, 'hello ', ['a', { href: './world', title: null }, 'world']]],
    ]);
  });
});
