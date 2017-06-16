const fs = require('fs');
const path = require('path');
const { escapeWinPath } = require('./utils/escape-win-path');
const mkdirp = require('mkdirp');
const nunjucks = require('nunjucks');
const dora = require('dora');
const webpack = require('atool-build/lib/webpack');
const getWebpackCommonConfig = require('atool-build/lib/getWebpackCommonConfig');
const R = require('ramda');
const ghPages = require('gh-pages');
const getBishengConfig = require('./utils/get-bisheng-config');
const sourceData = require('./utils/source-data');
const generateFilesPath = require('./utils/generate-files-path');
const updateWebpackConfig = require('./utils/update-webpack-config');
const context = require('./context');

const entryTemplate = fs.readFileSync(path.join(__dirname, 'entry.nunjucks.js')).toString();
const routesTemplate = fs.readFileSync(path.join(__dirname, 'routes.nunjucks.js')).toString();
const tmpDirPath = path.join(__dirname, '..', 'tmp');
mkdirp.sync(tmpDirPath);

function getRoutesPath(configPath, themePath, configEntryName) {
  const routesPath = path.join(tmpDirPath, `routes.${configEntryName}.js`);
  const themeConfig = require(escapeWinPath(configPath)).themeConfig || {};
  fs.writeFileSync(
    routesPath,
    nunjucks.renderString(routesTemplate, {
      themeConfig: JSON.stringify(themeConfig),
      themePath: escapeWinPath(themePath),
    }),
  );
  return routesPath;
}

function generateEntryFile(configPath, configTheme, configEntryName, root) {
  const entryPath = path.join(tmpDirPath, `entry.${configEntryName}.js`);
  const routesPath = getRoutesPath(
    configPath,
    path.dirname(configTheme),
    configEntryName)
    ;
  fs.writeFileSync(
    entryPath,
    nunjucks.renderString(entryTemplate, {
      routesPath: escapeWinPath(routesPath),
      root: escapeWinPath(root),
    }),
  );
}

exports.start = function start(program) {
  const configFile = path.join(process.cwd(), program.config || 'bisheng.config.js');
  const bishengConfig = getBishengConfig(configFile);
  context.initialize({ bishengConfig });
  mkdirp.sync(bishengConfig.output);

  const template = fs.readFileSync(bishengConfig.htmlTemplate).toString();
  const templatePath = path.join(process.cwd(), bishengConfig.output, 'index.html');
  fs.writeFileSync(templatePath, nunjucks.renderString(template, { root: '/' }));

  generateEntryFile(
    configFile,
    bishengConfig.theme,
    bishengConfig.entryName,
    '/',
  );

  const doraConfig = Object.assign({}, {
    cwd: path.join(process.cwd(), bishengConfig.output),
    port: bishengConfig.port,
  }, bishengConfig.doraConfig);
  doraConfig.plugins = [
    [require.resolve('dora-plugin-webpack'), {
      disableNpmInstall: true,
      cwd: process.cwd(),
      config: 'bisheng-inexistent.config.js',
    }],
    path.join(__dirname, 'dora-plugin-bisheng'),
    require.resolve('dora-plugin-browser-history'),
  ];
  const usersDoraPlugin = bishengConfig.doraConfig.plugins || [];
  doraConfig.plugins = doraConfig.plugins.concat(usersDoraPlugin);

  if (program.livereload) {
    doraConfig.plugins.push(require.resolve('dora-plugin-livereload'));
  }
  dora(doraConfig);
};

const ssrTemplate = fs.readFileSync(path.join(__dirname, 'ssr.nunjucks.js')).toString();

function filenameToUrl(filename) {
  if (filename.endsWith('index.html')) {
    return filename.replace(/index\.html$/, '');
  }
  return filename.replace(/\.html$/, '');
}
exports.build = function build(program, callback) {
  const configFile = path.join(process.cwd(), program.config || 'bisheng.config.js');
  const bishengConfig = getBishengConfig(configFile);
  context.initialize({
    bishengConfig,
    isBuild: true,
  });
  mkdirp.sync(bishengConfig.output);

  const entryName = bishengConfig.entryName;
  generateEntryFile(
    configFile,
    bishengConfig.theme,
    entryName,
    bishengConfig.root,
  );
  const webpackConfig = updateWebpackConfig(getWebpackCommonConfig({ cwd: process.cwd() }));
  webpackConfig.UglifyJsPluginConfig = {
    output: {
      ascii_only: true,
    },
    compress: {
      warnings: false,
    },
  };
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin(webpackConfig.UglifyJsPluginConfig));
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  }));


  const ssrWebpackConfig = Object.assign({}, webpackConfig);
  const ssrPath = path.join(tmpDirPath, `ssr.${entryName}.js`);
  const routesPath = getRoutesPath(configFile, path.dirname(bishengConfig.theme), entryName);
  fs.writeFileSync(ssrPath, nunjucks.renderString(ssrTemplate, { routesPath }));

  ssrWebpackConfig.entry = {
    [`${entryName}-ssr`]: ssrPath,
  };
  ssrWebpackConfig.target = 'node';
  ssrWebpackConfig.output = Object.assign({}, ssrWebpackConfig.output, {
    path: tmpDirPath,
    library: 'ssr',
    libraryTarget: 'commonjs',
  });
  ssrWebpackConfig.plugins = ssrWebpackConfig.plugins
    .filter(plugin => !(plugin instanceof webpack.optimize.CommonsChunkPlugin));

  webpack(webpackConfig, (err, stats) => {
    if (err !== null) {
      return console.error(err);
    }

    if (stats.hasErrors()) {
      console.log(stats.toString('errors-only'));
      return;
    }

    const markdown = sourceData.generate(bishengConfig.source, bishengConfig.transformers);
    const themeConfig = require(bishengConfig.theme);
    let filesNeedCreated = generateFilesPath(themeConfig.routes, markdown).map(bishengConfig.filePathMapper);
    filesNeedCreated = R.unnest(filesNeedCreated);

    const template = fs.readFileSync(bishengConfig.htmlTemplate).toString();

    if (!program.ssr) {
      require('./loaders/common/boss').jobDone();
      const fileContent = nunjucks.renderString(template, { root: bishengConfig.root });
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
    webpack(ssrWebpackConfig, () => {
      require('./loaders/common/boss').jobDone();

      const ssr = require(path.join(tmpDirPath, `${entryName}-ssr`)).ssr;
      const fileCreatedPromises = filesNeedCreated.map((file) => {
        const output = path.join(bishengConfig.output, file);
        mkdirp.sync(path.dirname(output));
        return new Promise((resolve) => {
          ssr(filenameToUrl(file), (content) => {
            const fileContent = nunjucks
                    .renderString(template, { root: bishengConfig.root, content });
            fs.writeFileSync(output, fileContent);
            console.log('Created: ', output);
            resolve();
          });
        });
      });
      Promise.all(fileCreatedPromises)
        .then(() => {
          if (callback) {
            callback();
          }
        });
    });
  });
};

function pushToGhPages(basePath) {
  const options = {
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
  const repo = program.repo;
  if (program.pushOnly) {
    const output = typeof program.pushOnly === 'string' ? program.pushOnly : './_site';
    const basePath = path.join(process.cwd(), output);
    pushToGhPages(basePath, repo);
  } else {
    const configFile = path.join(process.cwd(), program.config || 'bisheng.config.js');
    const bishengConfig = getBishengConfig(configFile);
    const basePath = path.join(process.cwd(), bishengConfig.output);
    exports.build(program, () => pushToGhPages(basePath, repo));
  }
};
