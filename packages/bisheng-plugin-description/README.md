# bisheng-plugin-description

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

In template:

```jsx
<div>
  { utils.toReactComponent(pageData.description) }
</div>
```

## Liscense

MIT
