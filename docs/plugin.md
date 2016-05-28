# Plugin

A plugin is just a npm package with the following directory structure:

```bash
└── lib
    ├── browser.js # optional
    └── node.js # optional
```

## browser.js

`browser.js` exports a function which takes `config` and returns an object.

```js
moldule.exports = (config) => {
  return {
    utils: {...},
    converters: [...],
  };
};
```

`config` is plugin's config:

```js
// in bisheng.config.js
module.exports = {
  plugins: [ 'pluginName?config1=value1&config2=value2' ],
}

// will get this config object in plugin
{
  config1: value1,
  config2: value2,
}
```

`utils` of the returned value will be merged to `props.utils`, for example:

```js
// in browser.js
{
  utils: {
    say(sth) {
      alert(sth);
    },
  },
}

// in template
props.utils.say('Hello world!');
```

`converters` will concat other plugins' converters, and then pass to [jsonml-to-react-component](https://github.com/benjycui/jsonml-to-react-component)(which is used by `props.utils.toReactComponent`).

## node.js

`node.js` exports a function which take `markdownData` and `config`, and then return a new `markdownData`.

```js
module.exports = (markdownData, config) => {
  // do something...
  return markdownData;
};
```

`markdownData` is the returned value of [mark-twain](https://github.com/benjycui/mark-twain).

`config` is the same as `browser.js`'s `config`.
