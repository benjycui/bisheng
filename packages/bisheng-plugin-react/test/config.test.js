'use strict';

const path = require('path');
const assert = require('assert');
const modifyConfig = require('../lib/config')({ lang: '__react' });

describe('lib/config.js', function() {
  describe('#webpackConfig', function() {
    const webpackConfig = {
      module: {
        loaders: [{
          test: /\.md$/,
          loaders: [
            'aaa',
            'babel',
            'ccc',
          ],
        }],
      },
    };
    const modifiedConfig = modifyConfig.webpackConfig(webpackConfig);

    it('should insert `jsonml-react-loader` after `babel`', function() {
      assert.deepEqual(modifiedConfig.module.loaders[0].loaders, [
        'aaa',
        'babel',
        path.join(__dirname, '../lib/jsonml-react-loader?lang=__react'),
        'ccc',
      ]);
    });
  });
});
