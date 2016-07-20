'use strict';

const R = require('ramda');
const exist = require('exist.js');

function hasParams(route) {
  return route && route.split('/').some((snippet) => snippet.startsWith(':'));
}

function has404(filesPath) {
  return filesPath.indexOf('/404.html') >= 0;
}

function getFilesPath(item, markdown) {
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
  } else if (item.route && item.route.endsWith('/')) {
    return [`${item.route}index.html`];
  }
  return [`${item.route}.html`];
}

function generateFilesPath(completedRoutes, markdown) {
  let filesPath = [];
  const pathForEach = (item) =>
    Array.isArray(item) ? filesPath = filesPath.concat(item) : filesPath.push(item);
  R.chain((item) => {
    if (item.children && !item.route && !item.dataSource) {
      const _itemWrapper = item.children.map(childItem =>
        getFilesPath(childItem, markdown));
      return _itemWrapper;
    }
    return getFilesPath(item, markdown);
  }, completedRoutes).forEach(pathForEach);
  return has404(filesPath) ? filesPath : filesPath.concat('/404.html');
}

module.exports = generateFilesPath;
