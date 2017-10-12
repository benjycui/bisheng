import { tmpdir } from 'os';

export default function babel() {
  return {
    cacheDirectory: tmpdir(),
    presets: [
      [require.resolve('babel-preset-env'), {
        targets: {
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        },
      }],
    ],
    plugins: [
      require.resolve('babel-plugin-add-module-exports'),
      require.resolve('babel-plugin-transform-decorators-legacy'),
    ],
  };
}
