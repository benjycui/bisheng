const path = require('path');
const dora = require('dora');
const getConfig = require('./utils/get-config');

exports.start = function start(program) {
  const configFile = program.config || `${process.cwd()}/bisheng.config.js`;
  const config = getConfig(configFile);

  // TODO
  dora({
    port: config.port,
    plugins: [
      'dora-plugin-webpack?disableNpmInstall',
      `${__dirname}${path.sep}dora-plugin-bisheng?config=${configFile}`,
    ],
  });
};
