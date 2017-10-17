# bisheng-plugin-description

[![](https://img.shields.io/travis/benjycui/bisheng.svg?style=flat-square)](https://travis-ci.org/benjycui/bisheng)
[![npm package](https://img.shields.io/npm/v/bisheng-plugin-description.svg?style=flat-square)](https://www.npmjs.org/package/bisheng-plugin-description)
[![NPM downloads](http://img.shields.io/npm/dm/bisheng-plugin-description.svg?style=flat-square)](https://npmjs.org/package/bisheng-plugin-description)
[![Dependency Status](https://david-dm.org/benjycui/bisheng-plugin-description.svg?style=flat-square)](https://david-dm.org/benjycui/bisheng-plugin-description)

To extract description from Markdown.

## Usage

Install:

```bash
npm i --save bisheng-plugin-description
```

Add 'bisheng-plugin-description' to `bisehng.config.js`'s plugins.

```js
module.exports = {
  plugins: ['bisheng-plugin-description'],
};
```

In Markdown:

```markdown
---
title: ...
...
---

This is description.

---

This is main content.
```

In template:

```jsx
<div>
  { utils.toReactComponent(pageData.description) }
</div>
```

## Liscense

MIT
