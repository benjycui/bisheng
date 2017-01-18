'use strict';

const assert = require('assert');
const stringify = require('../../lib/utils/stringify');

describe('utils/stringify', function() {
  it('should stringify array correctly', function() {
    assert.strictEqual(stringify([1]), '[\n  1\n]');
    assert.strictEqual(stringify([1, 2]), '[\n  1,\n  2\n]');
  });

  it('should stringify nested array correctly', function() {
    assert.strictEqual(stringify([[1]]), '[\n  [\n    1\n  ]\n]');
    assert.strictEqual(stringify([1, [2]]), '[\n  1,\n  [\n    2\n  ]\n]');
  });

  it('should stringify array with object correctly', function() {
    assert.strictEqual(stringify([{}]), '[\n  {\n\n  }\n]');
    assert.strictEqual(stringify([1, {}]), '[\n  1,\n  {\n\n  }\n]');
  });

  it('should stringify object correctly', function() {
    assert.strictEqual(stringify({ a: 1 }), '{\n  "a": 1\n}');
    assert.strictEqual(
      stringify({ a: 1, b: 2 }),
      '{\n  "a": 1,\n  "b": 2\n}'
    );
  });

  it('should stringify nested object correctly', function() {
    assert.strictEqual(stringify({ a: {} }), '{\n  "a": {\n\n  }\n}');
    assert.strictEqual(
      stringify({ a: { b: 1 } }),
      '{\n  "a": {\n    "b": 1\n  }\n}'
    );
  });

  it('should stringify object with array correctly', function() {
    assert.strictEqual(stringify({ a: [] }), '{\n  "a": [\n\n  ]\n}');
    assert.strictEqual(
      stringify({ a: 1, b: [] }),
      '{\n  "a": 1,\n  "b": [\n\n  ]\n}'
    );
  });

  it('should stringify `null` correctly', function() {
    assert.strictEqual(stringify(null), 'null');
  });

  it('should strinfify Date object correctly', function() {
    const now = new Date();
    assert.strictEqual(stringify(now), JSON.stringify(now));
  });

  it('should extract code from __BISHENG_EMBENED_CODE', function() {
    assert.strictEqual(
      stringify({
        __BISHENG_EMBEDED_CODE: true,
        code: 'console.log("Hello world!")',
      }),
      'console.log("Hello world!")'
    );
  });
});
