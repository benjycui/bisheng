const path = require('path');
const rucksack = require('rucksack-css');
const autoprefixer = require('autoprefixer');
const svgo = require('postcss-svgo');

module.exports = {
  source: './content',
  theme: path.join(__dirname, './_theme'),
  postcssConfig: {
    plugins: [
      rucksack(),
      autoprefixer(),
      svgo(),
    ]
  }
};
