import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { join } from 'path';
import rucksack from 'rucksack-css';
import autoprefixer from 'autoprefixer';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

import getBabelCommonConfig from './getBabelCommonConfig';
import getTSCommonConfig from './getTSCommonConfig';

/* eslint quotes:0 */

export default function getWebpackCommonConfig() {
  const jsFileName = '[name].js';
  const cssFileName = '[name].css';
  const commonName = 'common.js';

  const babelQuery = getBabelCommonConfig();
  const tsQuery = getTSCommonConfig();
  tsQuery.declaration = false;

  return {

    babel: babelQuery,
    ts: {
      transpileOnly: true,
      compilerOptions: tsQuery,
    },

    output: {
      path: join(process.cwd(), './dist/'),
      filename: jsFileName,
      chunkFilename: jsFileName,
    },

    resolve: {
      modulesDirectories: ['node_modules', join(__dirname, '../node_modules')],
      extensions: ['', '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
    },

    resolveLoader: {
      modulesDirectories: ['node_modules', join(__dirname, '../node_modules')],
    },

    module: {
      noParse: [/moment.js/],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          query: babelQuery,
        },
        {
          test: /\.jsx$/,
          loader: require.resolve('babel-loader'),
          query: babelQuery,
        },
        {
          test: /\.tsx?$/,
          loaders: [require.resolve('babel-loader'), require.resolve('ts-loader')],
        },
        {
          test(filePath) {
            return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath);
          },
          loader: ExtractTextPlugin.extract(`${require.resolve('css-loader')}` +
            `?sourceMap&-restructuring&-autoprefixer!${require.resolve('postcss-loader')}`),
        },
        {
          test: /\.module\.css$/,
          loader: ExtractTextPlugin.extract(`${require.resolve('css-loader')}` +
            `?sourceMap&-restructuring&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer!` +
            `${require.resolve('postcss-loader')}`),
        },
        {
          test(filePath) {
            return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
          },
          loader: ExtractTextPlugin.extract(`${require.resolve('css-loader')}?sourceMap&-autoprefixer!` +
            `${require.resolve('postcss-loader')}!` +
            `${require.resolve('less-loader')}?{"sourceMap":true}`),
        },
        {
          test: /\.module\.less$/,
          loader: ExtractTextPlugin.extract(`${require.resolve('css-loader')}?` +
            `sourceMap&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer!` +
            `${require.resolve('postcss-loader')}!` +
            `${require.resolve('less-loader')}?` +
            `{"sourceMap":true}`),
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: `${require.resolve('url-loader')}?` +
          `limit=10000&minetype=application/font-woff`,
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: `${require.resolve('url-loader')}?` +
          `limit=10000&minetype=application/font-woff`,
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: `${require.resolve('url-loader')}?` +
          `limit=10000&minetype=application/octet-stream`,
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: `${require.resolve('url-loader')}?` +
        `limit=10000&minetype=application/vnd.ms-fontobject`,
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: `${require.resolve('url-loader')}?` +
          `limit=10000&minetype=image/svg+xml`,
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          loader: `${require.resolve('url-loader')}?limit=10000`,
        },
        {
          test: /\.json$/,
          loader: `${require.resolve('json-loader')}`,
        },
      ],
    },

    postcss: [
      rucksack(),
      autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
      }),
    ],

    plugins: [
      new webpack.optimize.CommonsChunkPlugin('common', commonName),
      new ExtractTextPlugin(cssFileName, {
        disable: false,
        allChunks: true,
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new CaseSensitivePathsPlugin(),
      new FriendlyErrorsWebpackPlugin(),
    ],
  };
}
