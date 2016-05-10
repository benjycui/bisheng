const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const nunjucks = require('nunjucks');
const dora = require('dora');
const webpack = require('atool-build/lib/webpack');
const getWebpackCommonConfig = require('atool-build/lib/getWebpackCommonConfig');
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
  fs.writeFileSync(indexPath, nunjucks.renderString(template, { root: config.root }));

  dora({
    port: config.port,
    plugins: [
      'webpack?disableNpmInstall',
      `${__dirname}${path.sep}dora-plugin-bisheng?config=${configFile}`,
      'browser-history',
    ],
  });
};

exports.build = function build(program) {
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

  const webpackConfig = updateWebpackConfig(getWebpackCommonConfig({ cwd: process.cwd() }));
  webpack(webpackConfig).run(() => {});
};
