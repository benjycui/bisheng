const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const dora = require('dora');
const R = require('ramda');
const getConfig = require('./get-config');
const generateDataFile = require('./generate-data-file');

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
