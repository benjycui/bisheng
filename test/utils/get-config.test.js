'use strict';

const assert = require('assert');
const path = require('path');
const getConfig = require('../../lib/utils/get-config');

describe('utils/get-config', function() {
  it('should return default config when no custom config is provided', function() {
    const config = getConfig('./no-such.config.js.');

    assert.strictEqual(config.webpackConfig(1), 1);
    delete config.webpackConfig;

    assert.deepEqual(config, {
      source: './posts',
      output: './_site',
      theme: './_theme',
      port: 8000,
      root: '/',
      plugins: [path.join(__dirname, '..', '..', 'lib', 'bisheng-plugin-highlight')],
    });
  });

  it('should merge custom config to default config', function() {
    const config = getConfig(path.join(__dirname, '../fixtures/bisheng.config.js'));
    delete config.webpackConfig;
    assert.deepEqual(config, {
      source: './content',
      output: './_site',
      theme: './_theme',
      port: 8000,
      root: '/',
      plugins: [
        path.join(__dirname, '..', '..', 'lib', 'bisheng-plugin-highlight'),
        'bisheng-plugin-description',
      ],
    });
  });
});
