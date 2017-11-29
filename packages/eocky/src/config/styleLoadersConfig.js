import rucksack from 'rucksack-css';
import autoprefixer from 'autoprefixer';
import stylus from 'stylus';

const postcssOptions = {
  plugins: [
    rucksack(),
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
  ],
};

function plugin() {
  return style => {
    style.define('url', stylus.resolver());
  };
}

export default [
  {
    test(filePath) {
      return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath);
    },
    use: [{
      loader: 'css-loader',
      options: {
        restructuring: false,
        autoprefixer: false,
      },
    }, {
      loader: 'postcss-loader',
      options: postcssOptions,
    }],
  },
  {
    test: /\.module\.css$/,
    use: [{
      loader: 'css-loader',
      options: {
        restructuring: false,
        modules: true,
        localIdentName: '[local]___[hash:base64:5]',
        autoprefixer: false,
      },
    }, {
      loader: 'postcss-loader',
      options: postcssOptions,
    }],
  },
  {
    test(filePath) {
      return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
    },
    use: [{
      loader: 'css-loader',
      options: {
        autoprefixer: false,
      },
    }, {
      loader: 'postcss-loader',
      options: postcssOptions,
    }, 'less-loader'],
  },
  {
    test: /\.module\.less$/,
    use: [{
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[local]___[hash:base64:5]',
        autoprefixer: false,
      },
    }, {
      loader: 'postcss-loader',
      options: postcssOptions,
    }, 'less-loader'],
  },
  {
    test(filePath) {
      return /\.scss$/.test(filePath) && !/\.module\.scss$/.test(filePath);
    },
    use: [{
      loader: 'css-loader',
      options: {
        autoprefixer: false,
      },
    }, {
      loader: 'postcss-loader',
      options: postcssOptions,
    }, 'sass-loader'],
  },
  {
    test: /\.module\.scss$/,
    use: [{
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[local]___[hash:base64:5]',
        autoprefixer: false,
      },
    }, {
      loader: 'postcss-loader',
      options: postcssOptions,
    }, 'sass-loader'],
  },
  {
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      // 'stylus-loader'
      {
        loader: 'stylus-loader',
        options: {
          use: [plugin()]
        }
      }
    ]
  }
];
