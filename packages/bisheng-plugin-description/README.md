# bisheng-plugin-description

[![Build Status](https://travis-ci.org/benjycui/bisheng-plugin-description.svg?branch=master)](https://travis-ci.org/benjycui/bisheng-plugin-description)

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
