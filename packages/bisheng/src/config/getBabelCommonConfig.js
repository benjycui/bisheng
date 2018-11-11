const { resolve } = require;

export default function babel() {
  return {
    cacheDirectory: true,
    presets: [
      '@babel/preset/react',
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
      resolve('babel-plugin-add-module-exports'),
      resolve('@babel/plugin-proposal-object-rest-spread'),
      [
        resolve('@babel/plugin-proposal-decorators'),
        { decoratorsBeforeExport: true },
      ],
      resolve('@babel/plugin-proposal-class-properties'),
    ],
  };
}
