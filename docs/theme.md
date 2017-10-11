# Theme

A theme includes a config file and styles as well as templates. The directory structure of a theme is:

```bash
theme
├── index.js # config file, required
├── static # style files
│   └── style.css
└── template # templates are JSX files
    ├── NotFound.jsx # required
    └── Template.jsx
```

e.g. [ant-design](https://github.com/ant-design/ant-design/tree/master/site/theme)

## Theme as NPM Package

We can also publish our theme as a NPM package, so that other can install it as a dependency.

Directory structure:

```bash
lib
├── index.js # config file, required
├── static # style files
│   └── style.css
└── template # templates are JSX files
    ├── NotFound.jsx # required
    └── Template.jsx
```

`package.json`:

```json
{
  "main": "./lib/index.js",
  "files": ["lib", ...]
}
```

e.g. [bisheng-theme-one](https://github.com/benjycui/bisheng-theme-one)

## `index.js`

`index.js` includes `routes` and theme's own config.

```js
module.exports = {
  // routes is required
  routes: {
    path: '/',
    component: './template/Archive',

    // optional, it's equal to `path` if omitted.
    dataPath: 'path-to-markdown-file',
    ...
    childRoutes: [{
      path: 'posts/:post',
      component: './template/Post',

      // we can use variables in `dataPath`, and values of variables are equal to them in path
      dataPath: 'posts/:post',
    }],
  },

  // the following configs are optional
  lazyLoad: true,
  pick: {
    archive(markdownData) { ... },
    ...
  },
  plugins: ['bisheng-plugin-react', ...],
};
```

The configuration of `routes` is similar with [react-router's](https://github.com/reactjs/react-router/blob/master/docs/guides/RouteConfiguration.md#configuration-with-plain-routes). The differences are:

* `component` should be a string which is a path of a component.
* `dataPath` means which Markdown file need to be rendered.

### lazyLoad: Boolean | (nodePath, nodeValue) => Boolean

> default: false

If `lazyLoad` is `false`, it means that the whole Markdown data tree will be load while users visit any page.

If `lazyLoad` is `true`, it meas that Markdown data will only be loaded while it's needed.

And `lazyLoad` could be a function, it's similar to `ture`, but you can determine whether a subtree of the Markdown data tree should be loaded lazily as one file.

**Note:** when `lazyLoad` or the returned value of `lazyLoad()` is `true`, the Markdown data(or subtree) will be wrapped in a function which will return a promise.

[**More about lazy load**](https://github.com/benjycui/bisheng/tree/master/docs/lazy-load.md).

### pick: Object { [field]: Function }

> default: {}

To get part of data from Markdown data, and then put all the snippets into `props.picked` and pass it to template.

[**More about pick**](https://github.com/benjycui/bisheng/tree/master/docs/pick.md).

### plugins: Array[String]

> default: []

A list of plugins.

```js
module.exports = {
  plugins: [
    'pluginName?config1=value1&config2=value2',
    'anotherPluginName',
  ],
};
```

The config of plugins follows [webpack loaders' convention](https://www.npmjs.com/package/loader-utils#parsequery).

[**More about plugin**](https://github.com/benjycui/bisheng/tree/master/docs/plugin.md).

* [bisheng-plugin-description](https://github.com/benjycui/bisheng-plugin-description)
* [bisheng-plugin-toc](https://github.com/benjycui/bisheng-plugin-toc)
* [bisheng-plugin-react](https://github.com/benjycui/bisheng-plugin-react)


## Templates

A template is just a React component, `bisheng` will pass [`themeConfig`](https://github.com/benjycui/bisheng#themeconfig-any) `data` `pageData` `utils` and all the [react-router](https://github.com/reactjs/react-router) props to it.

* `data` contains the whole Markdown data tree which is generated from [`source`](https://github.com/benjycui/bisheng#source-string--arraystring--object-category-string--arraystring).
* `pageData` is the content of a specific Markdown file. Actually, `bisheng` just get it from `data`. `bisheng` will determine which Markdown data should be pass as `pageData` by the configuration of `path` & `dataPath` in routes, for example:
  1. User visits `/posts/hello-world`.
  2. The URL matches the route `/posts/:post`.
  3. The corresponding `dataPath` is `/posts/:post`.
  4. So, `bisheng` will get `data.posts['hello-world']` and pass it as `pageData` to template.
* `uitls` includes `bisheng`'s and plugins' utilities:
  * `utils.toReactComponent` to convert JsonML to React component.
  * `utils.get` to get nested value from an object, it's from [exist.js](https://github.com/benjycui/exist.js#existgetobj-nestedprop-defaultvalue).
