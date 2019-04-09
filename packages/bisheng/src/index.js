import openBrowser from 'react-dev-utils/openBrowser';
import getWebpackCommonConfig from './config/getWebpackCommonConfig';
import updateWebpackConfig from './config/updateWebpackConfig';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const nunjucks = require('nunjucks');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const R = require('ramda');
const ghPages = require('gh-pages');
const { escapeWinPath } = require('./utils/escape-win-path');
const getBishengConfig = require('./utils/get-bisheng-config');
const sourceData = require('./utils/source-data');
const generateFilesPath = require('./utils/generate-files-path');
const getThemeConfig = require('./utils/get-theme-config');
const context = require('./context');
const Module = require('module');

// We need to inject the require logic to support use origin node_modules
// if currently not provided.
const oriRequire = Module.prototype.require;
Module.prototype.require = function (...args) {
  const moduleName = args[0];
  try {
    return oriRequire.apply(this, args);
  } catch (err) {
    const newArgs = [...args];
    if (moduleName[0] !== '/') {
      newArgs[0] = path.join(process.cwd(), 'node_modules', moduleName);
    }
    return oriRequire.apply(this, newArgs);
  }
};

const tmpDirPath = path.join(__dirname, '..', 'tmp');
mkdirp.sync(tmpDirPath);

function getRoutesPath(themePath, configEntryName) {
  const routesTemplate = fs.readFileSync(path.join(__dirname, 'routes.nunjucks.js')).toString();
  const routesPath = path.join(tmpDirPath, `routes.${configEntryName}.js`);
  const { bishengConfig, themeConfig } = context;
  fs.writeFileSync(
    routesPath,
    nunjucks.renderString(routesTemplate, {
      themePath: escapeWinPath(themePath),
      themeConfig: JSON.stringify(bishengConfig.themeConfig),
      themeRoutes: JSON.stringify(themeConfig.routes),
    }),
  );
  return routesPath;
}

function generateEntryFile(configTheme, configEntryName, root) {
  const entryTemplate = fs.readFileSync(path.join(__dirname, 'entry.nunjucks.js')).toString();
  const entryPath = path.join(tmpDirPath, `entry.${configEntryName}.js`);
  const routesPath = getRoutesPath(
    path.dirname(configTheme),
    configEntryName,
  );
  fs.writeFileSync(
    entryPath,
    nunjucks.renderString(entryTemplate, {
      routesPath: escapeWinPath(routesPath),
      root: escapeWinPath(root),
    }),
  );
}

exports.start = function start(program) {
  const configFile = path.join(
    process.cwd(),
    program.config || 'bisheng.config.js',
  );
  const bishengConfig = getBishengConfig(configFile);
  const themeConfig = getThemeConfig(bishengConfig.theme);
  context.initialize({
    bishengConfig,
    themeConfig,
  });
  mkdirp.sync(bishengConfig.output);

  const template = fs.readFileSync(bishengConfig.htmlTemplate).toString();
  // dev manifest
  const manifest = {
    js: [ `${bishengConfig.entryName}.js` ],
    // inject style
    css: [ ],
  }
  const templateData = Object.assign(
    { root: '/', manifest },
    bishengConfig.htmlTemplateExtraData || {},
  );
  const templatePath = path.join(
    process.cwd(),
    bishengConfig.output,
    'index.html',
  );
  fs.writeFileSync(templatePath, nunjucks.renderString(template, templateData));

  generateEntryFile(
    bishengConfig.theme,
    bishengConfig.entryName,
    '/',
  );

  const webpackConfig = updateWebpackConfig(getWebpackCommonConfig(), 'start');
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  const serverOptions = {
    quiet: true,
    hot: true,
    ...bishengConfig.devServerConfig,
    contentBase: path.join(process.cwd(), bishengConfig.output),
    historyApiFallback: true,
    host: 'localhost',
  };
  WebpackDevServer.addDevServerEntrypoints(webpackConfig, serverOptions);
  const compiler = webpack(webpackConfig);
  // Ref: https://github.com/pigcan/blog/issues/6
  // Webpack startup recompilation fix. Remove when @sokra fixes the bug.
  // https://github.com/webpack/webpack/issues/2983
  // https://github.com/webpack/watchpack/issues/25
  const timefix = 11000;
  compiler.plugin('watch-run', (watching, callback) => {
    watching.startTime += timefix;
    callback();
  });
  compiler.plugin('done', (stats) => {
    stats.startTime -= timefix;
  });

  const server = new WebpackDevServer(compiler, serverOptions);
  server.listen(bishengConfig.port, '0.0.0.0', () => openBrowser(`http://localhost:${bishengConfig.port}`));
};

const ssrTemplate = fs
  .readFileSync(path.join(__dirname, 'ssr.nunjucks.js'))
  .toString();

function filenameToUrl(filename) {
  if (filename.endsWith('index.html')) {
    return filename.replace(/index\.html$/, '');
  }
  return filename.replace(/\.html$/, '');
}

// hash { js: ['index-{hash}.js', ...], css: [ 'index.{hash}-{chunkId}.css' ] }
// no hash // { js: ['index.js', ...], css: [ 'index.{chunkId}.css' ] }
function getManifest(compilation) {
  const manifest = {}
  compilation.entrypoints.forEach((entrypoint, name) => {
    const js = [];
    const css = [];
    const initials = new Set();
    const chunks = entrypoint.chunks;
    // Walk main chunks
    for (const chunk of chunks) {
      for (let file of chunk.files) {
        if (!initials.has(file)) {
          initials.add(file);

          // Get extname
          const ext = path.extname(file).toLowerCase();
          if (file) {
            // Type classification
            switch (ext) {
              case '.js':
                js.push(file);
                break;
              case '.css':
                css.push(file);
                break;
              default:
                break;
            }
          }
        }
      }
    }

    manifest[name] = { js, css };
  })
  return manifest;
}

exports.build = function build(program, callback) {
  const configFile = path.join(
    process.cwd(),
    program.config || 'bisheng.config.js',
  );
  const bishengConfig = getBishengConfig(configFile);
  const themeConfig = getThemeConfig(bishengConfig.theme);
  context.initialize({
    bishengConfig,
    themeConfig,
    isBuild: true,
  });
  mkdirp.sync(bishengConfig.output);

  const { entryName } = bishengConfig;
  generateEntryFile(
    bishengConfig.theme,
    entryName,
    bishengConfig.root,
  );
  const webpackConfig = updateWebpackConfig(getWebpackCommonConfig(), 'build');
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  );

  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'production',
      ),
    }),
  );

  const ssrWebpackConfig = Object.assign({}, webpackConfig);
  const ssrPath = path.join(tmpDirPath, `ssr.${entryName}.js`);
  const routesPath = getRoutesPath(path.dirname(bishengConfig.theme), entryName);
  fs.writeFileSync(ssrPath, nunjucks.renderString(ssrTemplate, { routesPath: escapeWinPath(routesPath) }));

  ssrWebpackConfig.entry = {
    [`${entryName}-ssr`]: ssrPath,
  };
  ssrWebpackConfig.target = 'node';
  ssrWebpackConfig.output = Object.assign({}, ssrWebpackConfig.output, {
    filename: '[name].js',
    path: tmpDirPath,
    library: 'ssr',
    libraryTarget: 'commonjs',
  });

  webpack(webpackConfig, (err, stats) => {
    if (err !== null) {
      return console.error(err);
    }

    if (stats.hasErrors()) {
      console.log(stats.toString('errors-only'));
      return;
    }
    const manifest = getManifest(stats.compilation)[bishengConfig.entryName];

    const markdown = sourceData.generate(bishengConfig.source, bishengConfig.transformers);
    let filesNeedCreated = generateFilesPath(themeConfig.routes, markdown).map(bishengConfig.filePathMapper);
    filesNeedCreated = R.unnest(filesNeedCreated);

    const template = fs.readFileSync(bishengConfig.htmlTemplate).toString();

    if (!program.ssr) {
      require('./loaders/common/boss').jobDone();
      const templateData = Object.assign(
        {
          root: bishengConfig.root,
          hash: bishengConfig.hash,
          manifest,
        },
        bishengConfig.htmlTemplateExtraData || {},
      );
      const fileContent = nunjucks.renderString(template, templateData);
      filesNeedCreated.forEach((file) => {
        const output = path.join(bishengConfig.output, file);
        mkdirp.sync(path.dirname(output));
        fs.writeFileSync(output, fileContent);
        console.log('Created: ', output);
      });

      if (callback) {
        callback();
      }
      return;
    }

    context.turnOnSSRFlag();
    // If we can build webpackConfig without errors, we can build ssrWebpackConfig without errors.
    // Because ssrWebpackConfig are just part of webpackConfig.
    webpack(ssrWebpackConfig, (ssrBuildErr, ssrBuildStats) => {
      if (ssrBuildErr) throw ssrBuildErr;
      if (ssrBuildStats.hasErrors()) throw ssrBuildStats.toString('errors-only');

      require('./loaders/common/boss').jobDone();

      const { ssr } = require(path.join(tmpDirPath, `${entryName}-ssr`));
      const fileCreatedPromises = filesNeedCreated.map((file) => {
        const output = path.join(bishengConfig.output, file);
        mkdirp.sync(path.dirname(output));
        return new Promise((resolve) => {
          ssr(filenameToUrl(file), (error, content) => {
            if (error) {
              console.error(error);
              process.exit(1);
            }
            const templateData = Object.assign(
              {
                root: bishengConfig.root,
                content, hash: bishengConfig.hash,
                manifest,
              },
              bishengConfig.htmlTemplateExtraData || {},
            );
            const fileContent = nunjucks.renderString(template, templateData);
            fs.writeFileSync(output, fileContent);
            console.log('Created: ', output);
            resolve();
          });
        });
      });
      Promise.all(fileCreatedPromises).then(() => {
        if (callback) {
          callback();
        }
      });
    });
  });
};

function pushToGhPages(basePath, config) {
  const options = {
    ...config,
    depth: 1,
    logger(message) {
      console.log(message);
    },
  };
  if (process.env.RUN_ENV_USER) {
    options.user = {
      name: process.env.RUN_ENV_USER,
      email: process.env.RUN_ENV_EMAIL,
    };
  }
  ghPages.publish(basePath, options, (err) => {
    if (err) {
      throw err;
    }
    console.log('Site has been published!');
  });
}
exports.deploy = function deploy(program) {
  const config = {
    remote: program.remote,
    branch: program.branch,
  };
  if (program.pushOnly) {
    const output = typeof program.pushOnly === 'string' ? program.pushOnly : './_site';
    const basePath = path.join(process.cwd(), output);
    pushToGhPages(basePath, config);
  } else {
    const configFile = path.join(
      process.cwd(),
      program.config || 'bisheng.config.js',
    );
    const bishengConfig = getBishengConfig(configFile);
    const basePath = path.join(process.cwd(), bishengConfig.output);
    exports.build(program, () => pushToGhPages(basePath, config));
  }
};
