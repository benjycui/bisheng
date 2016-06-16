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
const toCompletedRoutes = require('./utils/to-completed-routes');
const generateFilesPath = require('./utils/generate-files-path');
const updateWebpackConfig = require('./utils/update-webpack-config');

function generateQuery(config) {
  return Object.keys(config)
    .map((key) => `${key}=${config[key]}`)
    .join('&');
}

function transformPlugins(plugins) {
  return plugins.map((plugin) => {
    if (typeof plugin === 'string') {
      return require.resolve(plugin);
    }

    return `${require.resolve(plugin[0])}?${generateQuery(plugin[1])}`;
  });
}

exports.start = function start(program) {
  const configFile = path.join(process.cwd(), program.config || 'bisheng.config.js');
  const config = getConfig(configFile);

  const template = fs.readFileSync(config.htmlTemplate).toString();
  const indexPath = path.join(process.cwd(), config.output, 'index.html');
  mkdirp.sync(config.output);
  fs.writeFileSync(indexPath, nunjucks.renderString(template, { root: '/' }));

  const doraConfig = Object.assign({}, {
    cwd: path.join(process.cwd(), config.output),
    port: config.port,
  }, config.doraConfig);
  const usersDoraPlugin = config.doraConfig.plugins || [];
  doraConfig.plugins = [
    `${require.resolve('dora-plugin-webpack')}?disableNpmInstall`,
    `${path.join(__dirname, 'dora-plugin-bisheng')}?config=${configFile}`,
    require.resolve('dora-plugin-browser-history'),
  ];
  doraConfig.plugins = doraConfig.plugins.concat(transformPlugins(usersDoraPlugin));
  if (program.livereload) {
    doraConfig.plugins.push(require.resolve('dora-plugin-livereload'));
  }

  require('babel-polyfill');
  dora(doraConfig);
};

const noop = () => {};
exports.build = function build(program, callback) {
  const configFile = path.join(process.cwd(), program.config || 'bisheng.config.js');
  const config = getConfig(configFile);

  const themeConfig = require(path.join(process.cwd(), config.theme));
  themeConfig.completedRoutes = toCompletedRoutes(themeConfig.routes);

  const markdown = markdownData.generate(config.source);
  const filesNeedCreated = generateFilesPath(themeConfig.completedRoutes, markdown);

  const template = fs.readFileSync(config.htmlTemplate).toString();
  const fileContent = nunjucks.renderString(template, { root: config.root });

  filesNeedCreated.forEach((file) => {
    const output = path.join(config.output, file);
    mkdirp.sync(path.dirname(output));
    fs.writeFileSync(output, fileContent);
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
  webpack(webpackConfig).run(callback || noop);
};

exports.deploy = function deploy(program) {
  exports.build(program, () => {
    const configFile = path.join(process.cwd(), program.config || 'bisheng.config.js');
    const config = getConfig(configFile);

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
    ghPages.publish(path.join(process.cwd(), config.output), options, (err) => {
      if (err) {
        throw err;
      }
      console.log('Site has been published!');
    });
  });
};
