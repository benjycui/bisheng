import { tmpdir } from 'os';

export default function babel() {
  return {
    cacheDirectory: tmpdir(),
    presets: [
      'react',
      [require.resolve('babel-preset-env'), {
        targets: {
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        },
      }],
    ],
    plugins: [
      require.resolve('babel-plugin-add-module-exports'),
      require.resolve('babel-plugin-transform-class-properties'),
      require.resolve('babel-plugin-transform-decorators-legacy'),
      require.resolve('babel-plugin-transform-object-rest-spread'),
    ],
  };
}
