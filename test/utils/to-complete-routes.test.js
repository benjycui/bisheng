'use strict';

const assert = require('assert');
const toCompletedRoutes = require('../../lib/utils/to-completed-routes');

describe('utils/to-completed-routes', function() {
  it('should just return the same value when route is completed routes', function() {
    const routes = [{
      route: '/',
      dataPath: '/',
      template: './template/Archive',
    }];

    assert.strictEqual(toCompletedRoutes(routes), routes);
  });

  it('should covert object to completed routes', function() {
    const routes = {
      '/': './template/Archive',
    };

    assert.deepEqual(toCompletedRoutes(routes), [{
      route: '/',
      dataPath: '/',
      template: './template/Archive',
    }]);
  });
});
