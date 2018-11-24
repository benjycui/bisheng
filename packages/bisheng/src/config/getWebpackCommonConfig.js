import { join } from 'path';
// import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import WebpackBar from 'webpackbar';

import getBabelCommonConfig from './getBabelCommonConfig';
import getTSCommonConfig from './getTSCommonConfig';

/* eslint quotes:0 */

export default function getWebpackCommonConfig() {
  const NODE_ENV = process.env.NODE_ENV || 'production';
  const isProd = NODE_ENV === 'production';
  const fileNameHash = `[name]${isProd ? '.[contenthash:6]' : ''}`;
  const chunkFileName = `${fileNameHash}.js`;
  const cssFileName = `${fileNameHash}.css`;
  // const commonName = 'common.js';

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
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: babelOptions,
        },
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          options: babelOptions,
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: babelOptions,
            },
            {
              loader: 'ts-loader',
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
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: cssFileName,
      }),
      new CaseSensitivePathsPlugin(),
      new WebpackBar({
        name: '🚚  Bisheng',
      }),
      new FriendlyErrorsWebpackPlugin(),
    ],
  };
}
