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

  const babelOptions = getBabelCommonConfig();
  const tsOptions = getTSCommonConfig();
  const postcssOptions = {
    sourceMap: true,
    plugins: [
      rucksack(),
      autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
      }),
    ],
  };

  return {
    output: {
      filename: jsFileName,
      chunkFilename: jsFileName,
    },

    resolve: {
      modules: ['node_modules', join(__dirname, '../node_modules')],
      extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
    },

    resolveLoader: {
      modules: ['node_modules', join(__dirname, '../node_modules')],
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
          use: [{
            loader: 'babel-loader',
            options: babelOptions,
          }, {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: tsOptions,
            },
          }],
        },
        {
          test(filePath) {
            return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath);
          },
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
                restructuring: false,
                autoprefixer: false,
              },
            }, {
              loader: 'postcss-loader',
              options: postcssOptions,
            }],
          }),
        },
        {
          test: /\.module\.css$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
                restructuring: false,
                modules: true,
                localIdentName: '[local]___[hash:base64:5]',
                autoprefixer: false,
              },
            }, {
              loader: 'postcss-loader',
              options: postcssOptions,
            }],
          }),
        },
        {
          test(filePath) {
            return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
          },
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
                autoprefixer: false,
              },
            }, {
              loader: 'postcss-loader',
              options: postcssOptions,
            }, {
              loader: 'less-loader',
              options: {
                sourceMap: true,
              },
            }],
          }),
        },
        {
          test: /\.module\.less$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[local]___[hash:base64:5]',
                autoprefixer: false,
              },
            }, {
              loader: 'postcss-loader',
              options: postcssOptions,
            }, {
              loader: 'less-loader',
              options: {
                sourceMap: true,
              },
            }],
          }),
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&minetype=application/font-woff',
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&minetype=application/font-woff',
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&minetype=application/octet-stream',
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&minetype=application/vnd.ms-fontobject',
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&minetype=image/svg+xml',
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          loader: 'url-loader?limit=10000',
        },
      ],
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: commonName,
      }),
      new ExtractTextPlugin({
        filename: cssFileName,
        disable: false,
        allChunks: true,
      }),
      new CaseSensitivePathsPlugin(),
      new FriendlyErrorsWebpackPlugin(),
    ],
  };
}
