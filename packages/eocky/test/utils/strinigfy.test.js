const assert = require('assert');
const stringify = require('../../lib/utils/stringify');

describe('bisheng/utils/stringify', () => {
  it('should stringify array correctly', () => {
    assert.strictEqual(stringify([1]), '[\n  1\n]');
    assert.strictEqual(stringify([1, 2]), '[\n  1,\n  2\n]');
  });

  it('should stringify nested array correctly', () => {
    assert.strictEqual(stringify([[1]]), '[\n  [\n    1\n  ]\n]');
    assert.strictEqual(stringify([1, [2]]), '[\n  1,\n  [\n    2\n  ]\n]');
  });

  it('should stringify array with object correctly', () => {
    assert.strictEqual(stringify([{}]), '[\n  {\n\n  }\n]');
    assert.strictEqual(stringify([1, {}]), '[\n  1,\n  {\n\n  }\n]');
  });

  it('should stringify object correctly', () => {
    assert.strictEqual(stringify({ a: 1 }), '{\n  "a": 1\n}');
    assert.strictEqual(stringify({ a: 1, b: 2 }), '{\n  "a": 1,\n  "b": 2\n}');
  });

  it('should stringify nested object correctly', () => {
    assert.strictEqual(stringify({ a: {} }), '{\n  "a": {\n\n  }\n}');
    assert.strictEqual(stringify({ a: { b: 1 } }), '{\n  "a": {\n    "b": 1\n  }\n}');
  });

  it('should stringify object with array correctly', () => {
    assert.strictEqual(stringify({ a: [] }), '{\n  "a": [\n\n  ]\n}');
    assert.strictEqual(stringify({ a: 1, b: [] }), '{\n  "a": 1,\n  "b": [\n\n  ]\n}');
  });

  it('should stringify `null` correctly', () => {
    assert.strictEqual(stringify(null), 'null');
  });

  it('should strinfify Date object correctly', () => {
    const now = new Date();
    assert.strictEqual(stringify(now), JSON.stringify(now));
  });

  it('should extract code from __BISHENG_EMBENED_CODE', () => {
    const res = stringify({
      __BISHENG_EMBEDED_CODE: true,
      code: 'console.log("Hello world!")',
    });
    assert.strictEqual(res, 'console.log("Hello world!")');
  });
});
