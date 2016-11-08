'use strict';

const R = require('ramda');
const exist = require('exist.js');
const fs = require('fs');
const join = require('path').join;

function hasParams(path) {
  return path.split('/').some((snippet) => snippet.startsWith(':'));
}

function has404(files) {
  return files.some(f => f.path.indexOf('/404.html') >= 0);
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
      const nestedRoutes = R.chain(flattenRoutes, item.childRoutes.map((child) => {
        return Object.assign({}, child, {
          path: join(item.path, child.path),
        });
      }));
      flattenedRoutes = flattenedRoutes.concat(nestedRoutes);
    }
  });
  return flattenedRoutes;
}

function getFileContent(file) {
  let filePaths = [];
  if (typeof file === 'string') {
    filePaths = [file];
  } else if (typeof file.index === 'string') {
    filePaths = [file.index];
  } else if (typeof file.index === 'object') {
    filePaths = Object.keys(file.index).map(key => file.index[key]);
  } else if (typeof file === 'object') {
    filePaths = Object.keys(file).map(key => file[key]);
  }
  return filePaths.map(p => fs.readFileSync(p).toString()).filter(content => !!content).join('\n');
}

function camelCase(name) {
  return name.charAt(0).toUpperCase() +
    name.slice(1).replace(/-(\w)/g, (m, n) => n.toUpperCase());
}

module.exports = function generateFilesPath(routes, markdown) {
  const flattenedRoutes = flattenRoutes(routes);

  const filesPath = R.chain((item) => {
    if (hasParams(item.path)) {
      const dataPathSnippets = item.dataPath.split('/').slice(1);
      const firstParamIndex = dataPathSnippets.findIndex((snippet) => snippet.startsWith(':'));
      const firstParam = dataPathSnippets[firstParamIndex];

      const dataSet = exist.get(markdown, dataPathSnippets.slice(0, firstParamIndex), {});
      const processedCompleteRoutes = Object.keys(dataSet).map((key) => {
        const pathSnippet = key.replace(/\.md/, '');
        const path = item.path.replace(firstParam, pathSnippet);
        const dataPath = item.dataPath.replace(firstParam, pathSnippet);
        return { path, dataPath };
      });
      return generateFilesPath(processedCompleteRoutes, markdown);
    }

    const splitDataPaths = item.dataPath.split('/').filter(p => !!p);
    let content = '';
    let title = '';
    if (splitDataPaths.length > 0) {
      content = getFileContent(exist.get(markdown, splitDataPaths, {}));
      title = camelCase(splitDataPaths.slice(-1)[0]);
    }
    return [{
      path: item.path.endsWith('/') ? `${item.path}index.html` : `${item.path}.html`,
      title: title,
      content: content,
    }];
  }, flattenedRoutes);

  return has404(filesPath) ? filesPath : filesPath.concat([{
    path: '/404.html',
    title: '404 Not Found',
  }]);
};
