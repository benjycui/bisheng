'use strict';

module.exports = function toCompletedRoutes(routes) {
  if (!Array.isArray(routes)) {
    return Object.keys(routes)
      .map(function(route) {
        return {
          route: route,
          dataPath: route,
          template: routes[route],
        };
      });
  }
  return routes;
};
