module.exports = {
  routes: {
    '/': require('./template/Home'),
    '/archive': require('./template/Archive'),
    '/posts/:post': require('./template/Article'),
  }
};
