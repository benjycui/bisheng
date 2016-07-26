'use strict';

const R = require('ramda');
const exist = require('exist.js');

function hasParams(route) {
  return route.split('/').some((snippet) => snippet.startsWith(':'));
}

function has404(filesPath) {
  return filesPath.indexOf('/404.html') >= 0;
}

function flattenCompletedRoutes(completedRoutes) {
  let flattenRoutes = [];
  completedRoutes.forEach((item) => {
    if (!item.children) {
      const copy = Object.assign({}, item);
      if (!copy.dataPath) {
        copy.dataPath = copy.route;
      }
      flattenRoutes.push(copy);
      return;
    }

    flattenRoutes = flattenRoutes.concat(item.children.map((child) => {
      return Object.assign({}, child, {
        route: item.route + '/' + child.route,
      });
    }));
  });
  return flattenRoutes;
}

module.exports = function generateFilesPath(completedRoutes, markdown) {
  const flattenRoutes = flattenCompletedRoutes(completedRoutes);
  const filesPath = R.chain((item) => {
    if (hasParams(item.route)) {
      const dataPathSnippets = item.dataPath.split('/').slice(1);
      const firstParamIndex = dataPathSnippets.findIndex((snippet) => snippet.startsWith(':'));
      const firstParam = dataPathSnippets[firstParamIndex];

      const dataSet = exist.get(markdown, dataPathSnippets.slice(0, firstParamIndex), {});
      const processedCompleteRoutes = Object.keys(dataSet).map((key) => {
        const pathSnippet = key.replace(/\.md/, '');
        const route = item.route.replace(firstParam, pathSnippet);
        const dataPath = item.dataPath.replace(firstParam, pathSnippet);
        return { route, dataPath };
      });

      return generateFilesPath(processedCompleteRoutes, markdown);
    } else if (item.route.endsWith('/')) {
      return [`${item.route}index.html`];
    }
    return [`${item.route}.html`];
  }, flattenRoutes);

  return has404(filesPath) ? filesPath : filesPath.concat('/404.html');
};
