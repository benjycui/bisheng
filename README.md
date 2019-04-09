# Bi Sheng

[![](https://img.shields.io/travis/benjycui/bisheng.svg?style=flat-square)](https://travis-ci.org/benjycui/bisheng)
[![Build status](https://ci.appveyor.com/api/projects/status/lu5ut8vphqdfbxhi?svg=true)](https://ci.appveyor.com/project/benjycui/bisheng)
[![npm package](https://img.shields.io/npm/v/bisheng.svg?style=flat-square)](https://www.npmjs.org/package/bisheng)
[![NPM downloads](http://img.shields.io/npm/dm/bisheng.svg?style=flat-square)](https://npmjs.org/package/bisheng)
[![Dependency Status](https://david-dm.org/benjycui/bisheng.svg?style=flat-square)](https://david-dm.org/benjycui/bisheng)

> [Bi Sheng](https://en.wikipedia.org/wiki/Bi_Sheng) was the Chinese inventor of the first known movable type technology.

`bisheng` is designed to transform [Markdown](https://en.wikipedia.org/wiki/Markdown)(and other static files with transformers) into static websites and blogs using [React](https://facebook.github.io/react/).

## Sites built with BiSheng

* [A simple blog](http://benjycui.github.io/bisheng/)
* [Ant Design](http://ant.design)
* [Ant Motion](http://motion.ant.design)
* [Ant Design Mobile](http://mobile.ant.design/)
* [Ant Financial Design Platform](https://design.alipay.com/)
* [React AMap](https://elemefe.github.io/react-amap/articles/start)

You can create a PR to extend this list with your amazing website which is built with BiSheng.

## Features

`bisheng` is based on [dora](https://github.com/dora-js/dora) & [webpack](https://webpack.github.io/) & [React](https://facebook.github.io/react/) & [react-router](https://github.com/ReactTraining/react-router), and it has the following features:

* Support [`browserHistory`](https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#browserhistory), even in [GitHub Pages](https://pages.github.com/).
* Lazy load for Markdown data.
* [Plugin](https://github.com/benjycui/bisheng/blob/master/docs/plugin.md) system to extend default behaviour.
* Server-side render for SEO.

## Big picture

![Big picture of BiSheng](https://raw.githubusercontent.com/benjycui/bisheng/master/big-picture.jpg)

### Articles

* [bisheng-sourceCode-plugin](https://github.com/liangklfangl/bisheng-sourceCode-plugin)

## Usage

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

**Note:** please make sure that `source` and `theme` exists, and `theme` should not be an empty directory. Just use [bisheng-theme-one](https://github.com/benjycui/bisheng/tree/master/packages/bisheng-theme-one), if you don't know how to develop a theme. See a simple demo [here](https://github.com/benjycui/bisheng/tree/master/packages/bisheng-example).

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
  devServerConfig: {},
  webpackConfig(config) {
    return config;
  },
  hash: false,

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
└── dir1
  ├── a.md
  └── b.md
```

Will output a **Markdown data tree**:

```js
{
  dir1: {
    a: {...},
    b: {...},
  },
}
```

And each Markdown file will be parsed as a **Markdown data**. Actually, a Markdown data is the returned value of [mark-twain](https://github.com/benjycui/mark-twain), and it could be preprocessed by plugins.

#### exclude: RegExp

> default: null

If you want to exclude some files in your `source`, just use `exclude`. Then bisheng will not parse files which match `exclude`.

#### output: String

> default: './_site'

To set directory where `bisheng` will generate (HTML & CSS & JavaScript) files to.

#### theme: String

> default: './_theme'

To set directory where we put the theme of website, and it also can be a npm package name.

[**More about theme**](https://github.com/benjycui/bisheng/tree/master/docs/theme.md).

* [bisheng-theme-one](https://github.com/benjycui/bisheng/tree/master/packages/bisheng-theme-one)

#### themeConfig: any

> undefined

A set of configuration that your theme provides, and then your theme can read it from `props.themeConfig`.

> Note: `themeConfig` will be `JSON.stringify` before it's passed to props, so you cannot pass function/RegExp through `themeConfig`.

#### htmlTemplate: String

> default: [`bisheng/lib/template.html`](https://github.com/benjycui/bisheng/blob/master/packages/bisheng/src/template.html)

The HTML template which will be use to generate HTML files which will be sent to users.

**Note:** template will be parsed by [nunjucks](https://mozilla.github.io/nunjucks/), and you can use the following variables in this template:

* [`root`](https://github.com/benjycui/bisheng#root-string)
* all attribute of [htmlTemplateExtraData](#htmltemplateextradata-object)

#### htmlTemplateExtraData: Object

> default: `{}`

The Extra Data which will be used to render [htmlTemplate](#htmltemplate-string).

#### devServerConfig: Object

> default: {}

You can consult [webpack-dev-server's documentation](https://webpack.js.org/configuration/dev-server/).

#### postcssConfig: Object

```js
default: {
    plugins: [
      rucksack(),
      autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
      }),
    ],
  }
```


You can consult [webpack postcss-loader's documentation](https://webpack.js.org/loaders/postcss-loader/#options).

#### webpackConfig: (config) => config

> default: (config) => config

To modify the webpack config, you can extend the config like [this](https://github.com/ant-tool/atool-build#配置扩展).

#### transformers: Object[]

> [{ test: /\.md$/, use: [MarkdownTransformer](https://github.com/benjycui/bisheng/blob/master/packages/bisheng/src/transformers/markdown.js) }]

A list of transformers that will be used to transform static files.

#### entryName: String

> default: 'index'

The name of files which will be generated by webpack, such as `[entryName].js` & `[entryName].css`.

#### root: String

> default: '/'

If the website will be deployed under a sub-directory of a domain (something like `http://benjycui.github.io/bisheng-theme-one/`), we must set it (such as `/bisheng-theme-one/`).

## License

MIT
