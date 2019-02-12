const R = require('ramda');
const exist = require('exist.js');
const { join } = require('path');
const { toUriPath } = require('./escape-win-path');

function hasParams(path) {
  return path.split('/').some(snippet => snippet.startsWith(':'));
}

function has404(filesPath) {
  return filesPath.indexOf('/404.html') >= 0;
}

function flattenRoutes(routes) {
  let flattenedRoutes = [];
  (Array.isArray(routes) ? routes : [routes]).forEach((item) => {
    const copy = Object.assign({}, item);
    if (!copy.dataPath) {
      copy.dataPath = copy.path;
    }
    flattenedRoutes.push(copy);

    if (item.childRoutes) {
      const nestedRoutes = R.chain(flattenRoutes, item.childRoutes.map(child => Object.assign({}, child, {
        path: join(item.path, child.path),
      })));
      flattenedRoutes = flattenedRoutes.concat(nestedRoutes);
    }
  });
  return flattenedRoutes;
}

module.exports = function generateFilesPath(routes, markdown) {
  const flattenedRoutes = flattenRoutes(routes).map(function(item) {
    item.path = toUriPath(item.path);
    item.dataPath = toUriPath(item.dataPath);
    return item;
  });

  const filesPath = R.chain((item) => {
    if (hasParams(item.path)) {
      const dataPathSnippets = item.dataPath.split('/').slice(1);
      const firstParamIndex = dataPathSnippets.findIndex(snippet => snippet.startsWith(':'));
      const firstParam = dataPathSnippets[firstParamIndex];

      const dataSet = exist.get(markdown, dataPathSnippets.slice(0, firstParamIndex), {});
      const processedCompleteRoutes = Object.keys(dataSet).map((key) => {
        const pathSnippet = key.replace(/\.md/, '');
        const path = item.path.replace(firstParam, pathSnippet);
        const dataPath = item.dataPath.replace(firstParam, pathSnippet);
        return { path, dataPath };
      });

      return generateFilesPath(processedCompleteRoutes, markdown);
    } else if (item.path.endsWith('/')) {
      return [`${item.path}index.html`];
    }
    return [`${item.path}.html`];
  }, flattenedRoutes);

  return has404(filesPath) ? filesPath : filesPath.concat('/404.html');
};
