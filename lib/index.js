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

exports.start = function start(program) {
  const configFile = program.config || path.join(process.cwd(), 'bisheng.config.js');
  const config = getConfig(configFile);

  const template = fs.readFileSync(path.join(__dirname, 'template.html')).toString();
  const indexPath = path.join(process.cwd(), 'index.html');
  fs.writeFileSync(indexPath, nunjucks.renderString(template, { root: '/' }));

  dora({
    port: config.port,
    plugins: [
      'webpack?disableNpmInstall',
      `${__dirname}${path.sep}dora-plugin-bisheng?config=${configFile}`,
      'browser-history',
    ],
  });
};

const noop = () => {};
exports.build = function build(program, callback) {
  const configFile = program.config || path.join(process.cwd(), 'bisheng.config.js');
  const config = getConfig(configFile);
  mkdirp.sync(config.output);

  /* eslint-disable global-require */
  const themeConfig = require(path.join(process.cwd(), config.theme));
  /* eslint-enable global-require */
  themeConfig.completedRoutes = toCompletedRoutes(themeConfig.routes);

  const markdown = markdownData.generate(config.source, config.extension);
  const filesNeedCreated = generateFilesPath(themeConfig.completedRoutes, markdown);
  const template = fs.readFileSync(path.join(__dirname, 'template.html')).toString();
  const fileContent = nunjucks.renderString(template, { root: config.root });
  filesNeedCreated.forEach((file) => {
    const output = path.join(config.output, file);
    mkdirp.sync(path.dirname(output));
    fs.writeFileSync(output, fileContent);
  });

  const webpackConfig = updateWebpackConfig(getWebpackCommonConfig({ cwd: process.cwd() }), configFile, true);
  webpack(webpackConfig).run(callback || noop);
};

exports.deploy = function deploy(program) {
  exports.build(program, () => {
    const configFile = program.config || path.join(process.cwd(), 'bisheng.config.js');
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
      console.log('Site has been published');
    });
  });
};
