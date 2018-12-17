const { tmpdir } = require('os');

const { resolve } = require;

export default function babel() {
  return {
    cacheDirectory: tmpdir(),
    presets: [
      resolve('@babel/preset-react'),
      [
        resolve('@babel/preset-env'),
        {
          targets: {
            browsers: [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 8',
              'iOS >= 8',
              'Android >= 4',
            ],
          },
        },
      ],
    ],
    plugins: [
      resolve('@babel/plugin-proposal-object-rest-spread'),
      [
        resolve('@babel/plugin-proposal-decorators'),
        { decoratorsBeforeExport: true },
      ],
      resolve('@babel/plugin-proposal-class-properties'),
      resolve('@babel/plugin-proposal-export-default-from'),
      resolve('@babel/plugin-proposal-export-namespace-from'),
    ],
  };
}
