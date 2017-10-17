# bisheng-theme-one

[![npm package](https://img.shields.io/npm/v/bisheng-theme-one.svg?style=flat-square)](https://www.npmjs.org/package/bisheng-theme-one)
[![NPM downloads](http://img.shields.io/npm/dm/bisheng-theme-one.svg?style=flat-square)](https://npmjs.org/package/bisheng-theme-one)
[![Dependency Status](https://david-dm.org/benjycui/bisheng-theme-one.svg?style=flat-square)](https://david-dm.org/benjycui/bisheng-theme-one)

The one theme for [bisheng](https://github.com/benjycui/bisheng).

## Features

* Load Markdown data lazily.
* Server-side render for SEO.

## Usage

Installation:

```bash
npm i --save bisheng-theme-one
```

Configuration in `bisheng.config.js`:

```js
{
  theme: 'bisheng-theme-one',
  ...
}
```

## Note

`publishDate` is required in Markdown file:

```bash
---
title: Title
publishDate: 2011-11-11
---

Content
```

## Liscense

MIT
