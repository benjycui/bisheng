# Bi Sheng

[![](https://img.shields.io/travis/benjycui/bisheng.svg?style=flat-square)](https://travis-ci.org/benjycui/bisheng)
[![npm package](https://img.shields.io/npm/v/bisheng.svg?style=flat-square)](https://www.npmjs.org/package/bisheng)
[![NPM downloads](http://img.shields.io/npm/dm/bisheng.svg?style=flat-square)](https://npmjs.org/package/bisheng)
[![Dependency Status](https://david-dm.org/benjycui/bisheng.svg?style=flat-square)](https://david-dm.org/benjycui/bisheng)

> [Bi Sheng](https://en.wikipedia.org/wiki/Bi_Sheng) was the Chinese inventor of the first known movable type technology.

`bisheng` is designed to transform [Markdown](https://en.wikipedia.org/wiki/Markdown) into static websites and blogs using [React](https://facebook.github.io/react/).

[Demo](http://benjycui.github.io/bisheng-theme-one/)

## Features

* Support [`browserHistory`](https://github.com/reactjs/react-router/blob/master/docs/API.md#browserhistory), even in [GitHub Pages](https://pages.github.com/).
* Lazy load for Markdown data.

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
  lazyLoad: false,
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
  source: './posts',
  output: './_site',
  theme: './_theme',
  port: 8000,
  root: '/',
  plugins: [],
};
```

#### source: String | Array[String] | Object{ [category]: String | Array[String]}

To set directory/directories where we place Markdown files.

#### output: String

To set directory where `bisheng` will generate (HTML & CSS & JavaScript) files to.

#### lazyLoad: Boolean | (nodePath, nodeValue) => Boolean

If `lazyLoad` is `false`, it means that all the Markdown data will be load while users visit any page.

If `lazyLoad` is `true`, it meas that Markdown data will only be loaded while it's needed.

And `lazyLoad` could be a function, it's similar to `ture`, but you can determine whether a subtree will be loaded lazily as one Markdown data.

**Note:** when `lazyLoad` or the returned value of `lazyLoad()` is `true`, the Markdown data will be a function which will return a promise.

#### theme: String

To set directory where we put the theme of website.

[More about theme.](https://github.com/benjycui/bisheng/tree/master/docs/theme.md)

* [bisheng-theme-one](https://github.com/benjycui/bisheng-theme-one)

#### port: Number

To set the port which will be used when we start a local server.

#### root: String

If the website will be deployed under a sub-directory of a domain (something like `http://benjycui.github.io/bisheng-theme-one/`), we must set it (such as `/bisheng-theme-one/`).

#### plugins: Array[String]

A list of plugins.

```js
module.exports = {
  plugins: [
    'pluginName?config1=value1&config2=value2',
    'anotherPluginName',
  ],
};
```

[More about plugin.](https://github.com/benjycui/bisheng/tree/master/docs/plugin.md)

* [bisheng-plugin-description](https://github.com/benjycui/bisheng-plugin-description)
* [bisheng-plugin-toc](https://github.com/benjycui/bisheng-plugin-toc)
* [bisheng-plugin-react](https://github.com/benjycui/bisheng-plugin-react)

## Sites built with BiSheng

* [Ant Design](http://ant.design)
* [Ant Motion](http://motion.ant.design)
* [Ant Design Mobile](http://mobile.ant.design/)

## License

MIT
