import { join } from 'path';
// import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import WebpackBar from 'webpackbar';

import context from '../context';
import getBabelCommonConfig from './getBabelCommonConfig';
import getTSCommonConfig from './getTSCommonConfig';
import CleanUpStatsPlugin from '../utils/CleanUpStatsPlugin';

/* eslint quotes:0 */

export default function getWebpackCommonConfig() {
  const { isBuild, bishengConfig } = context;
  const NODE_ENV = process.env.NODE_ENV || 'production';
  const isProd = NODE_ENV === 'production';
  const fileNameHash = `[name]${isProd ? '.[contenthash:6]' : ''}`;
  const chunkFileName = `${fileNameHash}.js`;
  const isHash = isBuild && bishengConfig.hash;
  const cssFileName = isHash
    ? '[name]-[contenthash:8].css'
    : '[name].css';

  const babelOptions = getBabelCommonConfig();
  const tsOptions = getTSCommonConfig();

  return {
    mode: NODE_ENV,
    output: {
      filename: '[name].js',
      chunkFilename: chunkFileName,
    },

    resolve: {
      modules: ['node_modules', join(__dirname, '../../node_modules')],
      extensions: [
        '.web.tsx',
        '.web.ts',
        '.web.jsx',
        '.web.js',
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.json',
      ],
    },

    resolveLoader: {
      modules: ['node_modules', join(__dirname, '../../node_modules')],
    },

    module: {
      noParse: [/moment.js/],
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: babelOptions,
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: babelOptions,
            },
            {
              loader: require.resolve('ts-loader'),
              options: {
                transpileOnly: true,
                compilerOptions: tsOptions,
              },
            },
          ],
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            minetype: 'application/octet-stream',
          },
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            minetype: 'application/vnd.ms-fontobject',
          },
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            minetype: 'image/svg+xml',
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          cache: true,
        }),
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: cssFileName,
      }),
      new CaseSensitivePathsPlugin(),
      new WebpackBar({
        name: '🚚  Bisheng',
        color: '#2f54eb',
      }),
      new FriendlyErrorsWebpackPlugin(),
      new CleanUpStatsPlugin(),
    ],
  };
}
