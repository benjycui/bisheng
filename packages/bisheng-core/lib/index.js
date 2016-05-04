const fs = require('fs');
const path = require('path');
const dora = require('dora');
const mkdirp = require('mkdirp');
const getConfig = require('./utils/get-config');

exports.start = function start(program) {
  const configFile = program.config || `${process.cwd()}/bisheng.config.js`;
  const config = getConfig(configFile);

  mkdirp.sync(config.output);
  fs.createReadStream(`${__dirname}${path.sep}template.html`)
    .pipe(fs.createWriteStream(`${process.cwd()}${path.sep}index.html`));

  // TODO
  dora({
    port: config.port,
    plugins: [
      'dora-plugin-webpack?disableNpmInstall',
      `${__dirname}${path.sep}dora-plugin-bisheng?config=${configFile}`,
    ],
  });
};
