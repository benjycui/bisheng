'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const nunjucks = require('nunjucks');
const dora = require('dora');
const webpack = require('atool-build/lib/webpack');
const getWebpackCommonConfig = require('atool-build/lib/getWebpackCommonConfig');
const ghPages = require('gh-pages');
const getConfig = require('./utils/get-config');
const markdownData = require('./utils/markdown-data');
const generateFilesPath = require('./utils/generate-files-path');
const updateWebpackConfig = require('./utils/update-webpack-config');

const entryTemplate = fs.readFileSync(path.join(__dirname, 'entry.nunjucks.js')).toString();
const routesTemplate = fs.readFileSync(path.join(__dirname, 'routes.nunjucks.js')).toString();
mkdirp.sync(path.join(__dirname, '..', 'tmp'));

function getRoutesPath(themePath) {
  const routesPath = path.join(__dirname, '..', 'tmp', 'routes.js');
  fs.writeFileSync(
    routesPath,
    nunjucks.renderString(routesTemplate, { themePath })
  );
  return routesPath;
}

exports.start = function start(program) {
  const configFile = path.join(process.cwd(), program.config || 'bisheng.config.js');
  const config = getConfig(configFile);
  mkdirp.sync(config.output);

  const template = fs.readFileSync(config.htmlTemplate).toString();
  const templatePath = path.join(process.cwd(), config.output, 'index.html');
  fs.writeFileSync(templatePath, nunjucks.renderString(template, { root: '/' }));

  const entryPath = path.join(__dirname, '..', 'tmp', 'entry.' + config.entryName + '.js');
  const routesPath = getRoutesPath(path.join(process.cwd(), config.theme));
  fs.writeFileSync(
    entryPath,
    nunjucks.renderString(entryTemplate, {
      routesPath,
      root: '/',
    })
  );

  const doraConfig = Object.assign({}, {
    cwd: path.join(process.cwd(), config.output),
    port: config.port,
  }, config.doraConfig);
  doraConfig.plugins = [
    [require.resolve('dora-plugin-webpack'), {
      disableNpmInstall: true,
      cwd: process.cwd(),
      config: 'bisheng-inexistent.config.js',
    }],
    [path.join(__dirname, 'dora-plugin-bisheng'), {
      config: configFile,
    }],
    require.resolve('dora-plugin-browser-history'),
  ];
  const usersDoraPlugin = config.doraConfig.plugins || [];
  doraConfig.plugins = doraConfig.plugins.concat(usersDoraPlugin);

  if (program.livereload) {
    doraConfig.plugins.push(require.resolve('dora-plugin-livereload'));
  }
  dora(doraConfig);
};

const noop = () => {};
exports.build = function build(program, callback) {
  const configFile = path.join(process.cwd(), program.config || 'bisheng.config.js');
  const config = getConfig(configFile);

  const markdown = markdownData.generate(config.source);
  const entryPath = path.join(__dirname, '..', 'tmp', 'entry.' + config.entryName + '.js');
  const routesPath = getRoutesPath(path.join(process.cwd(), config.theme));
  fs.writeFileSync(
      entryPath,
      nunjucks.renderString(entryTemplate, {
        routesPath,
        root: config.root,
      })
    );

  const themeConfig = require(path.join(process.cwd(), config.theme));
  const filesNeedCreated = generateFilesPath(themeConfig.routes, markdown);

  const template = fs.readFileSync(config.htmlTemplate).toString();
  const fileContent = nunjucks.renderString(template, { root: config.root });

  filesNeedCreated.forEach((file) => {
    const output = path.join(config.output, file);
    mkdirp.sync(path.dirname(output));
    fs.writeFileSync(output, fileContent);
    console.log('Created: ', output);
  });

  const webpackConfig =
          updateWebpackConfig(getWebpackCommonConfig({ cwd: process.cwd() }), configFile, true);
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

  webpack(webpackConfig, function(err, stats) {
    if (err !== null) {
      return console.error(err);
    }

    if (stats.hasErrors()) {
      console.log(stats.toString('errors-only'));
    }
  }).run(callback || noop);
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
  if (program.pushOnly) {
    const output = typeof program.pushOnly === 'string' ? program.pushOnly : './_site';
    const basePath = path.join(process.cwd(), output);
    pushToGhPages(basePath);
  } else {
    const configFile = path.join(process.cwd(), program.config || 'bisheng.config.js');
    const config = getConfig(configFile);
    const basePath = path.join(process.cwd(), config.output);
    exports.build(program, () => pushToGhPages(basePath));
  }
};
