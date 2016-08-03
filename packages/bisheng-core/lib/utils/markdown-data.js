'use strict';

const fs = require('fs');
const path = require('path');
const R = require('ramda');

function ensureToBeArray(maybeArray) {
  return Array.isArray(maybeArray) ?
    maybeArray : [maybeArray];
}

function isDirectory(filename) {
  return fs.statSync(filename).isDirectory();
}

function isMDFile(filename) {
  const ext = path.extname(filename);
  return !isDirectory(filename) && ext === '.md';
}

function findMDFile(source) {
  return R.pipe(
    R.filter(R.either(isDirectory, isMDFile)),
    R.chain((filename) => {
      if (isDirectory(filename)) {
        const subFiles = fs.readdirSync(filename)
                .map((subFile) => path.join(filename, subFile));
        return findMDFile(subFiles);
      }
      return [filename];
    })
  )(source);
}

const rxSep = new RegExp(`[${path.sep}.]`);
function filesToTreeStructure(files) {
  return files.reduce((filesTree, filename) => {
    const propLens = R.lensPath(filename.replace(/\.md$/i, '').split(rxSep));
    return R.set(propLens, filename, filesTree);
  }, {});
}

function stringifyObject(nodePath, obj, lazyLoad, depth) {
  const indent = '  '.repeat(depth);
  const kvStrings = R.pipe(
    R.toPairs,
    /* eslint-disable no-use-before-define */
    R.map((kv) =>
          `${indent}  '${kv[0]}': ${stringify(nodePath + '/' + kv[0], kv[1], lazyLoad, depth + 1)},`)
    /* eslint-enable no-use-before-define */
  )(obj);
  return kvStrings.join('\n');
}

function lazyLoadWrapper(filePath, filename) {
  return 'function () {\n' +
    '  return new Promise(function (resolve) {\n' +
    '    require.ensure([], function (require) {\n' +
    `      resolve(require('${filePath}'));\n` +
    `    }, '${filename}');\n` +
    '  });\n' +
    '}';
}

function shouldLazyLoad(nodePath, nodeValue, lazyLoad) {
  if (typeof lazyLoad === 'function') {
    return lazyLoad(nodePath, nodeValue);
  }

  return typeof nodeValue === 'object' ? false : lazyLoad;
}

function stringify(nodePath, nodeValue, lazyLoad, depth) {
  const indent = '  '.repeat(depth);
  const shouldBeLazy = shouldLazyLoad(nodePath, nodeValue, lazyLoad);
  return R.cond([
    [(n) => typeof n === 'object', (obj) => {
      if (shouldBeLazy) {
        const filePath = path.join(__dirname, '..', '..', 'tmp', nodePath);
        const fileContent = 'module.exports = ' +
                `{\n${stringifyObject(nodePath, obj, false, 1)}\n}`;
        fs.writeFileSync(filePath, fileContent);
        return lazyLoadWrapper(filePath, nodePath + '.js');
      }
      return `{\n${stringifyObject(nodePath, obj, lazyLoad, depth)}\n${indent}}`;
    }],
    [R.T, (filename) => {
      const filePath = path.join(process.cwd(), filename);
      if (shouldBeLazy) {
        return lazyLoadWrapper(filePath, filename);
      }
      return `require('${filePath}')`;
    }],
  ])(nodeValue);
}

exports.generate = R.useWith((source) => {
  const mds = findMDFile(source);
  const filesTree = filesToTreeStructure(mds);
  return filesTree;
}, [ensureToBeArray]);

exports.stringify = (filesTree, lazyLoad) =>
  stringify('/', filesTree, lazyLoad, 0);
