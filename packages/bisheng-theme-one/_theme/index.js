module.exports = {
  home: '/',
  sitename: 'One',
  // tagline: 'BiSheng Theme',
  // navigation: [{
  //   title: 'BiSheng',
  //   link: 'https://github.com/benjycui/bisheng',
  // }],
  footer: 'The one theme for bisheng which is used to transform Markdown files into a SPA website using React.',
  // hideBisheng: true,
  github: 'https://github.com/benjycui/bisheng-theme-one',
  routes: {
    '/': require('./template/Archive'),
    '/posts/:post': require('./template/Post'),
    'tags': require('./template/TagCloud'),
  }
};
