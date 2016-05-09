const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const nunjucks = require('nunjucks');
const dora = require('dora');
const exist = require('exist.js');
const getConfig = require('./utils/get-config');
const markdownData = require('./utils/markdown-data');

exports.start = function start(program) {
  const configFile = program.config || path.join(process.cwd(), 'bisheng.config.js');
  const config = getConfig(configFile);

  const template = fs.readFileSync(path.join(__dirname, 'template.html')).toString();
  const indexPath = path.join(process.cwd(), 'index.html');
  fs.writeFileSync(indexPath, nunjucks.renderString(template, { root: config.root }));

  dora({
    port: config.port,
    plugins: [
      'webpack?disableNpmInstall',
      `${__dirname}${path.sep}dora-plugin-bisheng?config=${configFile}`,
      'browser-history',
    ],
  });
};

exports.build = function build(program) {
  const configFile = program.config || path.join(process.cwd(), 'bisheng.config.js');
  const config = getConfig(configFile);
  mkdirp.sync(config.output);

  const themeConfig = require(path.join(process.cwd(), config.theme));
  const markdown = markdownData.generate(config.source, config.extension);
  Object.keys(themeConfig.routes).forEach((route) => {
    const snippets = route.split('/');
    const subDirSnippets = snippets.slice(1, -1);
    const dir = path.join(config.output, subDirSnippets.join(path.sep));
    mkdirp.sync(dir);

    const lastItem = snippets[snippets.length - 1];
    const template = fs.readFileSync(path.join(__dirname, 'template.html')).toString();
    if (lastItem === '') {
      fs.writeFileSync(
        path.join(dir, 'index.html'),
        nunjucks.renderString(template, { root: config.root })
      );
    } else if (!lastItem.startsWith(':')) {
      fs.writeFileSync(
        path.join(dir, `${lastItem}.html`),
        nunjucks.renderString(template, { root: config.root })
      );
    } else if (subDirSnippets.length > 0) {
      Object.keys(exist.get(markdown, subDirSnippets)).forEach((page) => {
        fs.writeFileSync(
          path.join(dir, `${page.replace(/\.md/, '')}.html`),
          nunjucks.renderString(template, { root: config.root })
        );
      });
    }
  });
};
