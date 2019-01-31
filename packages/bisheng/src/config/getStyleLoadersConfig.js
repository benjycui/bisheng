export default ({ postcssConfig, lessConfig }) => ([
  {
    test(filePath) {
      return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath);
    },
    use: [
      {
        loader: require.resolve('css-loader'),
      },
      {
      loader: require.resolve('postcss-loader'),
        options: postcssConfig,
      }
    ],
  },
  {
    test: /\.module\.css$/,
    use: [
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: true,
          localIdentName: '[local]___[hash:base64:5]',
        },
      }, {
        loader: require.resolve('postcss-loader'),
        options: postcssConfig,
      }
    ],
  },
  {
    test(filePath) {
      return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
    },
    use: [
      {
        loader: require.resolve('css-loader'),
      },
      {
        loader: require.resolve('postcss-loader'),
        options: postcssConfig,
      }, {
        loader: require.resolve('less-loader'),
        options: lessConfig,
      }
    ],
  },
  {
    test: /\.module\.less$/,
    use: [
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: true,
          localIdentName: '[local]___[hash:base64:5]',
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: postcssConfig,
      }, {
        loader: require.resolve('less-loader'),
        options: lessConfig,
      }
    ],
  },
  {
    test(filePath) {
      return /\.scss$/.test(filePath) && !/\.module\.scss$/.test(filePath);
    },
    use: [
      {
        loader: require.resolve('css-loader'),
      },
      {
        loader: require.resolve('postcss-loader'),
        options: postcssConfig,
      },
      require.resolve('sass-loader'),
    ],
  },
  {
    test: /\.module\.scss$/,
    use: [
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: true,
          localIdentName: '[local]___[hash:base64:5]',
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: postcssConfig,
      },
      require.resolve('sass-loader'),
    ],
  }
]);
