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
mkdirp.sync(path.join(__dirname, '..', 'tmp'));

exports.start = function start(program) {
  const configFile = path.join(process.cwd(), program.config || 'bisheng.config.js');
  const config = getConfig(configFile);

  mkdirp.sync(config.output);
  Object.keys(config.entry).forEach((key) => {
    // Generate html files for each entry.
    const item = config.entry[key];
    const template = fs.readFileSync(item.htmlTemplate).toString();
    const templatePath = path.join(process.cwd(), config.output, key + '.html');
    fs.writeFileSync(templatePath, nunjucks.renderString(template, { root: '/' }));

    const entryTemplatePath = path.join(__dirname, '..', 'tmp', 'entry.' + key + '.js');
    fs.writeFileSync(
      entryTemplatePath,
      nunjucks.renderString(entryTemplate, {
        themePath: path.join(process.cwd(), item.theme),
        root: '/',
        entryName: key === 'index' ? '' : key,
      })
    );
  });

  const doraConfig = Object.assign({}, {
    cwd: path.join(process.cwd(), config.output),
    port: config.port,
  }, config.doraConfig);
  const usersDoraPlugin = config.doraConfig.plugins || [];
  doraConfig.plugins = [
    [require.resolve('dora-plugin-webpack'), {
      disableNpmInstall: true,
      cwd: process.cwd(),
      config: 'bisheng-inexistent.config.js',
    }],
    [path.join(__dirname, 'dora-plugin-bisheng'), {
      config: configFile,
    }],
    [require.resolve('dora-plugin-browser-history'), {
      rewrites: Object.keys(config.entry).map((key) => {
        return {
          from: new RegExp('/' + key),
          to: '/' + key + '.html',
        };
      }),
    }],
  ];

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
  Object.keys(config.entry).forEach((key) => {
    const item = config.entry[key];

    const entryTemplatePath = path.join(__dirname, '..', 'tmp', 'entry.' + key + '.js');
    fs.writeFileSync(
      entryTemplatePath,
      nunjucks.renderString(entryTemplate, {
        themePath: path.join(process.cwd(), item.theme),
        root: config.root,
        entryName: key === 'index' ? '' : key,
      })
    );

    const themeConfig = require(path.join(process.cwd(), item.theme));

    const filesNeedCreated = generateFilesPath(themeConfig.routes, markdown).map((filename) => {
      if (key === 'index') {
        return filename;
      }
      return path.join('/', key, filename);
    });

    const template = fs.readFileSync(item.htmlTemplate).toString();
    const fileContent = nunjucks.renderString(template, { root: config.root });

    filesNeedCreated.forEach((file) => {
      const output = path.join(config.output, file);
      mkdirp.sync(path.dirname(output));
      fs.writeFileSync(output, fileContent);
      console.log('Created: ', output);
    });
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
