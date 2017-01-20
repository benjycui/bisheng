'use strict';

const assert = require('assert');
const path = require('path');
const getBishengConfig = require('../../lib/utils/get-bisheng-config');
const getThemeConfig = require('../../lib/utils/get-theme-config');

describe('utils/get-bisheng-config', function() {
  it('should return default config when no custom config is provided', function() {
    const bishengConfig = getBishengConfig('./no-such.config.js.');

    assert.strictEqual(bishengConfig.webpackConfig(1), 1);
    delete bishengConfig.webpackConfig;
    delete bishengConfig.filePathMapper;

    assert.deepEqual(bishengConfig, {
      source: './posts',
      output: './_site',
      entryName: 'index',
      theme: './_theme',
      htmlTemplate: path.join(__dirname, '../../lib/template.html'),
      port: 8000,
      root: '/',
      doraConfig: {},
    });
  });

  it('should merge custom config to default config', function() {
    const bishengConfig = getBishengConfig(path.join(__dirname, '../fixtures/bisheng.config.js'));
    delete bishengConfig.webpackConfig;
    delete bishengConfig.filePathMapper;

    assert.deepEqual(bishengConfig, {
      source: './content',
      output: './_site',
      entryName: 'index',
      theme: './_theme',
      htmlTemplate: path.join(__dirname, '../../lib/template.html'),
      port: 8000,
      root: '/',
      doraConfig: {},
    });
  });
});

describe('utils/get-theme-config', () => {
  it('should merge custom plugins with default plugin', function() {
    const themeConfig = getThemeConfig(path.join(__dirname, '../fixtures/theme.index.js'));
    assert.deepEqual(themeConfig, {
      plugins: [
        path.join(__dirname, '..', '..', 'lib', 'bisheng-plugin-highlight'),
        'bisheng-plugin-description',
      ],
    });
  });
});
