# bisheng-plugin-react

[![](https://img.shields.io/travis/benjycui/bisheng-plugin-react.svg?style=flat-square)](https://travis-ci.org/benjycui/bisheng-plugin-react)
[![npm package](https://img.shields.io/npm/v/bisheng-plugin-react.svg?style=flat-square)](https://www.npmjs.org/package/bisheng-plugin-react)
[![NPM downloads](http://img.shields.io/npm/dm/bisheng-plugin-react.svg?style=flat-square)](https://npmjs.org/package/bisheng-plugin-react)
[![Dependency Status](https://david-dm.org/benjycui/bisheng-plugin-react.svg?style=flat-square)](https://david-dm.org/benjycui/bisheng-plugin-react)

To convert JSX which is written in Markdown to React.Element.

## Usage

Install:

```bash
npm i --save bisheng-plugin-react
```

Add 'bisheng-plugin-react to `bisehng.config.js`'s plugins.

```js
module.exports = {
  plugins: ['bisheng-plugin-react?lang=jsx'],
};
```

In Markdown:

<pre>
...

This is a button:

```jsx
import { Button } from 'antd';
ReactDOM.render(&lt;Button&gt;Click!&lt;/Button&gt;, mountNode);
```
...
</pre>

The above example will be rendered as:

![screenshot](https://raw.githubusercontent.com/benjycui/bisheng-plugin-react/master/screenshot.png)

## API

### lang: String

> default: 'react-component'

## License

MIT
