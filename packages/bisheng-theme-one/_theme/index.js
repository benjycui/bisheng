module.exports = {
  home: '/',
  sitename: 'One',
  // tagline: 'The one theme for bisheng',
  // navigation: [{
  //   title: 'BiSheng',
  //   link: 'https://github.com/benjycui/bisheng',
  // }],
  // footer: 'Copyright and so on...',
  // hideBisheng: true,
  github: 'https://github.com/benjycui/bisheng-theme-one',
  routes: {
    '/': './template/Archive',
    '/posts/:post': './template/Post',
    '/tags': './template/TagCloud',
  },
};
