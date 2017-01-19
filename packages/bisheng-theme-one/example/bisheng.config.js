module.exports = {
  theme: '../lib',
  lazyLoad: true,
  root: '/bisheng-theme-one/',
  plugins: ['bisheng-plugin-description'],
  pick: {
    posts(markdownData) {
      return {
        meta: markdownData.meta,
        description: markdownData.description,
      };
    }
  }
};
