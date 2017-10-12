const fs = require('fs');
const path = require('path');
const R = require('ramda');
const context = require('../context');
const { escapeWinPath, toUriPath } = require('./escape-win-path');

const sourceLoaderPath = path.join(__dirname, '..', 'loaders', 'source-loader');

function ensureToBeArray(maybeArray) {
  return Array.isArray(maybeArray) ?
    maybeArray : [maybeArray];
}

function shouldBeIgnore(filename) {
  const { exclude } = context.bishengConfig;
  return exclude && exclude.test(filename);
}

function isDirectory(filename) {
  return fs.statSync(filename).isDirectory();
}

const isValidFile = transformers => filename =>
  transformers.some(({ test }) => eval(test).test(filename)); // eslint-disable-line no-eval

function findValidFiles(source, transformers) {
  return R.pipe(
    R.reject(shouldBeIgnore),
    R.filter(R.either(isDirectory, isValidFile(transformers))),
    R.chain((filename) => {
      if (isDirectory(filename)) {
        const subFiles = fs.readdirSync(filename)
          .map(subFile => path.join(filename, subFile));
        return findValidFiles(subFiles, transformers);
      }
      return [filename];
    }),
  )(source);
}

const rxSep = new RegExp(`[${escapeWinPath(path.sep)}.]`);
function getPropPath(filename, sources) {
  return sources.reduce(
    (f, source) => f.replace(source, ''),
    filename.replace(new RegExp(`${path.extname(filename)}$`), ''),
  ).replace(/^\.?(?:\\|\/)+/, '').split(rxSep);
}

function filesToTreeStructure(files, sources) {
  const cleanedSources = sources.map(source => source.replace(/^\.?(?:\\|\/)/, ''));
  const filesTree = files.reduce((subFilesTree, filename) => {
    const propLens = R.lensPath(getPropPath(filename, cleanedSources));
    return R.set(propLens, filename, subFilesTree);
  }, {});
  return filesTree;
}

function stringifyObject({
  nodePath, nodeValue, depth, ...rest
}) {
  const indent = '  '.repeat(depth);
  const kvStrings = R.pipe(
    R.toPairs,
    /* eslint-disable no-use-before-define */
    R.map((kv) => {
      const valueString = stringify({
        ...rest,
        nodePath: `${nodePath}/${kv[0]}`,
        nodeValue: kv[1],
        depth: depth + 1,
      });
      return `${indent}  '${kv[0]}': ${valueString},`;
    }),
    /* eslint-enable no-use-before-define */
  )(nodeValue);
  return kvStrings.join('\n');
}

function lazyLoadWrapper({
  filePath,
  filename,
  isLazyLoadWrapper,
}) {
  const { isSSR } = context;
  const loaderString = isLazyLoadWrapper ? '' : `${sourceLoaderPath}!`;
  return `${'function () {\n' +
    '  return new Promise(function (resolve) {\n'}${
    isSSR ? '' : '    require.ensure([], function (require) {\n'
  }      resolve(require('${escapeWinPath(loaderString)}${escapeWinPath(filePath)}'));\n${
    isSSR ? '' : `    }, '${toUriPath(filename)}');\n`
  }  });\n` +
    '}';
}

function shouldLazyLoad(nodePath, nodeValue, lazyLoad) {
  if (typeof lazyLoad === 'function') {
    return lazyLoad(nodePath, nodeValue);
  }

  return typeof nodeValue === 'object' ? false : lazyLoad;
}

function stringify(params) {
  const {
    nodePath = '/',
    nodeValue,
    lazyLoad,
    depth = 0,
  } = params;
  const indent = '  '.repeat(depth);
  const shouldBeLazy = shouldLazyLoad(nodePath, nodeValue, lazyLoad);
  return R.cond([
    [n => typeof n === 'object', (obj) => {
      if (shouldBeLazy) {
        const filePath = `${path.join(
          __dirname, '..', '..', 'tmp',
          nodePath.replace(/^\/+/, '').replace(/\//g, '-'),
        )}.${context.bishengConfig.entryName}.js`;
        const fileInnerContent = stringifyObject({
          ...params,
          nodeValue: obj,
          lazyLoad: false,
          depth: 1,
        });
        const fileContent = `module.exports = {\n${fileInnerContent}\n}`;
        fs.writeFileSync(filePath, fileContent);
        return lazyLoadWrapper({
          filePath,
          filename: nodePath.replace(/^\/+/, ''),
          isLazyLoadWrapper: true,
        });
      }
      const objectKVString = stringifyObject({
        ...params,
        nodePath, // fix: generated file name
        depth, // fix: indentation
        nodeValue: obj,
      });
      return `{\n${objectKVString}\n${indent}}`;
    }],
    [R.T, (filename) => {
      const filePath = path.isAbsolute(filename) ?
        filename : path.join(process.cwd(), filename);
      if (shouldBeLazy) {
        return lazyLoadWrapper({ filePath, filename });
      }
      return `require('${escapeWinPath(sourceLoaderPath)}!${escapeWinPath(filePath)}')`;
    }],
  ])(nodeValue);
}

exports.generate = function generate(source, transformers = []) {
  if (source === null || source === undefined) {
    return {}; // For motion.ant.design, it doesn't need source sometimes.
  }
  if (R.is(Object, source) && !Array.isArray(source)) {
    return R.mapObjIndexed(value => generate(value, transformers), source);
  }
  const sources = ensureToBeArray(source);
  const validFiles = findValidFiles(sources, transformers);
  const filesTree = filesToTreeStructure(validFiles, sources);
  return filesTree;
};

exports.stringify = (
  filesTree,
  options = {}, /* { lazyLoad } */
) => stringify({ nodeValue: filesTree, ...options });

exports.traverse = function traverse(filesTree, fn) {
  Object.keys(filesTree).forEach((key) => {
    const value = filesTree[key];
    if (typeof value === 'string') {
      fn(value);
      return;
    }

    traverse(value, fn);
  });
};

// `.process` will be use in child process, so it cannot use `context`
exports.process = (
  filename,
  fileContent,
  plugins,
  transformers = [],
  isBuild, /* 'undefined' | true */
) => {
  // Mock Array.prototype.find(fn)
  let transformerIndex = -1;
  transformers.some(({ test }, index) => {
    transformerIndex = index;
    return eval(test).test(filename); // eslint-disable-line no-eval
  });
  const transformer = transformers[transformerIndex];

  const markdown = require(transformer.use)(filename, fileContent);
  const parsedMarkdown = plugins.reduce(
    (markdownData, plugin) =>
      require(plugin[0])(markdownData, plugin[1], isBuild === true),
    markdown,
  );
  return parsedMarkdown;
};
