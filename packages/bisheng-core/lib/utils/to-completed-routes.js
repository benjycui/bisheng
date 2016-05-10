module.exports = function toCompletedRoutes(routes) {
  if (!Array.isArray(routes)) {
    return Object.keys(routes)
      /* eslint-disable arrow-body-style */
      .map((route) => {
        return {
          route,
          dataPath: route,
          template: routes[route],
        };
      });
      /* eslint-enable arrow-body-style */
  }
  return routes;
};
