# Bi Sheng

[![](https://img.shields.io/travis/benjycui/bisheng.svg?style=flat-square)](https://travis-ci.org/benjycui/bisheng)
[![npm package](https://img.shields.io/npm/v/bisheng.svg?style=flat-square)](https://www.npmjs.org/package/bisheng)
[![NPM downloads](http://img.shields.io/npm/dm/bisheng.svg?style=flat-square)](https://npmjs.org/package/bisheng)
[![Dependency Status](https://david-dm.org/benjycui/bisheng.svg?style=flat-square)](https://david-dm.org/benjycui/bisheng)

> [Bi Sheng](https://en.wikipedia.org/wiki/Bi_Sheng) was the Chinese inventor of the first known movable type technology.

`bisheng` is designed to transform [Markdown](https://en.wikipedia.org/wiki/Markdown) into static websites and blogs using [React](https://facebook.github.io/react/).

## Sites built with BiSheng

* [A simple blog](http://benjycui.github.io/bisheng-theme-one/)
* [Ant Design](http://ant.design)
* [Ant Motion](http://motion.ant.design)
* [Ant Design Mobile](http://mobile.ant.design/)

You can create a PR to extend this list with your amazing website which is built with BiSheng.

## Features

`bisheng` is based on [dora](https://github.com/dora-js/dora) & [webpack](https://webpack.github.io/) & [React](https://facebook.github.io/react/) & [react-router](https://github.com/ReactTraining/react-router), and it has the following features:

* Support [`browserHistory`](https://github.com/reactjs/react-router/blob/master/docs/API.md#browserhistory), even in [GitHub Pages](https://pages.github.com/).
* Lazy load for Markdown data.
* [Plugin](https://github.com/benjycui/bisheng#plugins-arraystring) system to extend default behaviour.
* Server-side render for SEO.

## Big picture

![Big picture of BiSheng](https://raw.githubusercontent.com/benjycui/bisheng/master/big-picture.jpg)

## Usage

### Use `bisheng` in a new project

```bash
git clone git@github.com:benjycui/bisheng-theme-one.git myblog && cd myblog
rm -rf .git && npm i && npm start
open http://127.0.0.1:8000/
```

### Use `bisheng` in current project

Installation:

```bash
npm install --save-dev bisheng
```

Then, add `start` to [npm scripts](https://docs.npmjs.com/misc/scripts):

```json
{
  "scripts": {
    "start": "bisheng start"
  }
}
```

Create `bisheng.config.js`, otherwise `bisheng` will use the default config:

```js
module.exports = {
  source: './posts',
  output: './_site',
  theme: './_theme',
  port: 8000,
};
```

**Note:** please make sure that `source` and `theme` exists, and `theme` should not be an empty directory. Just copy [bisheng-theme-one](https://github.com/benjycui/bisheng-theme-one) to `theme`, if you don't know how to develop a theme.

Now, just run `npm start`.

## Documentation

### CLI

We can install `bisheng` as a cli command and explore what it can do by `bisheng -h`. However, the recommended way to use `bisheng` is to install it as `devDependencies`.

```bash
$ npm install -g bisheng
$ bisheng -h
  Usage: bisheng [command] [options]

  Commands:

    start [options]     to start a server
    build [options]     to build and write static files to `config.output`
    gh-pages [options]  to deploy website to gh-pages
    help [cmd]          display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

### Configuration

`bisheng` will read `bisheng.config.js` as its config file, but we can set the config file name by `--config`, something like this `bisheng --config another.config.js`.

The content of `bisheng.config.js` looks like this:

```js
module.exports = {
  port: 8000,
  source: './posts',
  output: './_site',
  theme: './_theme',
  htmlTemplate: path.join(__dirname, '../template.html'),
  doraConfig: {},
  webpackConfig(config) {
    return config;
  },

  entryName: 'index',
  root: '/',
};
```

#### port: Number

> default: 8000

To set the port which will be listened when we start a local server.

#### source: String | Array[String] | Object{ [category]: String | Array[String]}

> default: './posts'

To set directory/directories where we place Markdown files.

And all the Markdown files in `source` will be parsed and then structured as a tree data, for example:

```bash
posts
├── a.md
└── b.md
```

Will output a **Markdown data tree**:

```js
{
  posts: {
    a: {...},
    b: {...},
  },
}
```

And each Markdown file will be parsed as a **Markdown data**. Actually, a Markdown data is the returned value of [mark-twain](https://github.com/benjycui/mark-twain), and it could be preprocessed by plugins.

#### output: String

> default: './_site'

To set directory where `bisheng` will generate (HTML & CSS & JavaScript) files to.

#### theme: String

> default: './_theme'

To set directory where we put the theme of website, and it also can be a npm package name.

[**More about theme**](https://github.com/benjycui/bisheng/tree/master/docs/theme.md).

* [bisheng-theme-one](https://github.com/benjycui/bisheng-theme-one)

#### themeConfig: any

> undefined

A set of configuration that your theme provides, and then your theme can read it from `props.themeConfig`.

#### htmlTemplate: String

> default: [`bisheng/lib/template.html`](https://github.com/benjycui/bisheng/blob/master/src/template.html)

The HTML template which will be use to generate HTML files which will be sent to users.

**Note:** template will be parsed by [nunjucks](https://mozilla.github.io/nunjucks/), and you can use the following variables in this template:

* [`root`](https://github.com/benjycui/bisheng#root-string)

#### doraConfig: Object

> default: {}

You can consult [dora's documentation](https://github.com/dora-js/dora).

#### webpackConfig: (config) => config

> default: (config) => config

To modify the webpack config, you can extend the config like [this](https://github.com/ant-tool/atool-build#配置扩展).

#### entryName: String

> default: 'index'

The name of files which will be generated by webpack, such as `[entryName].js` & `[entryName].css`.

#### root: String

> default: '/'

If the website will be deployed under a sub-directory of a domain (something like `http://benjycui.github.io/bisheng-theme-one/`), we must set it (such as `/bisheng-theme-one/`).

## License

MIT
