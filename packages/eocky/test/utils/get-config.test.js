const assert = require('assert');
const path = require('path');
const getBishengConfig = require('../../lib/utils/get-bisheng-config');
const getThemeConfig = require('../../lib/utils/get-theme-config');

describe('bisheng/utils/get-bisheng-config', () => {
  it('should merge custom config to default config', () => {
    const bishengConfig = getBishengConfig(path.join(__dirname, '../fixtures/bisheng.config.js'));
    delete bishengConfig.webpackConfig;
    delete bishengConfig.filePathMapper;

    assert.equal(bishengConfig.postcssConfig.plugins.length, 3);
    delete bishengConfig.postcssConfig;

    assert.deepEqual(bishengConfig, {
      source: './content',
      output: './_site',
      entryName: 'index',
      theme: path.join(__dirname, '../fixtures/_theme/index.js'),
      htmlTemplate: path.join(__dirname, '../../lib/template.html'),
      port: 8000,
      root: '/',
      devServerConfig: {},
      transformers: [{
        test: /\.md$/.toString(),
        use: path.join(__dirname, '..', '..', 'lib', 'transformers', 'markdown'),
      }],
    });
  });
});

describe('bisheng/utils/get-theme-config', () => {
  it('should merge custom plugins with default plugin', () => {
    const themeConfig = getThemeConfig(path.join(__dirname, '../fixtures/theme.index.js'));
    assert.deepEqual(themeConfig, {
      plugins: [
        path.join(__dirname, '..', '..', 'lib', 'bisheng-plugin-highlight'),
        'bisheng-plugin-description',
      ],
    });
  });
});
