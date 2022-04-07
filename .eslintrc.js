module.exports = {
  extends: 'eslint-config-airbnb',
  env: {
    browser: true,
    mocha: true,
  },
  rules: {
    'consistent-return': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'no-underscore-dangle': 0,
    'max-len': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'arrow-parens': 0,
  },
};
