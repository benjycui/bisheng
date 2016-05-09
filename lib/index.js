const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');
const dora = require('dora');
const getConfig = require('./utils/get-config');

exports.start = function start(program) {
  const bishengLib = `${__dirname}${path.sep}`;
  const indexPath = `${process.cwd()}${path.sep}index.html`;
  const configFile = program.config || `${process.cwd()}/bisheng.config.js`;
  const config = getConfig(configFile);
  const template = fs.readFileSync(`${bishengLib}template.html`).toString();
  fs.writeFileSync(indexPath, nunjucks.renderString(template, { root: config.root }));
  dora({
    port: config.port,
    plugins: [
      'webpack?disableNpmInstall',
      `${bishengLib}dora-plugin-bisheng?config=${configFile}`,
      'browser-history',
    ],
  });
};
