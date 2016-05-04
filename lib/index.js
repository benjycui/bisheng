const fs = require('fs');
const path = require('path');
const dora = require('dora');
const getConfig = require('./utils/get-config');

exports.start = function start(program) {
  const configFile = program.config || `${process.cwd()}/bisheng.config.js`;
  const config = getConfig(configFile);

  const indexPath = `${process.cwd()}${path.sep}index.html`;
  if (!fs.existsSync(indexPath)) {
    fs.createReadStream(`${__dirname}${path.sep}template.html`)
      .pipe(fs.createWriteStream(indexPath));
  }

  // TODO
  dora({
    port: config.port,
    plugins: [
      'webpack?disableNpmInstall',
      `${__dirname}${path.sep}dora-plugin-bisheng?config=${configFile}`,
      'browser-history',
    ],
  });
};
