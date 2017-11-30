# Theme

主题由模板、样式和配置文件构成。其目录结构如下：

```bash
theme
├── index.js # 配置文件, required
├── routes.js # san-router 路由文件，这里只是一个例子，你可以在 index.js 中修改其路径
├── static # style files
│   └── style.css
└── template # 模板，依赖你在 routes 中配置了啥，支持 .san 文件
    ├── NotFound.js
    └── Template.san
```

Ant Design 采取了 bisheng 主题作为其官网方案，可以作为参考 [ant-design](https://github.com/ant-design/ant-design/tree/master/site/theme)

## 使用 npm 包作为主题

主题可以是一个 npm 包，这对复用主题，快速搭建站点非常友好。

目录结构：

```bash
lib
├── index.js # 配置文件, required
├── routes.js # san-router 路由文件，这里只是一个例子，你可以在 index.js 中修改其路径
├── static # style files
│   └── style.css
└── template # 模板，依赖你在 routes 中配置了啥，支持 .san 文件
    ├── NotFound.js
    └── Template.san
```

`package.json`:

```json
{
  "main": "./lib/index.js",
  "files": ["lib", ...]
}
```

参考：[eocky-theme-sanmui](./packages/eocky-theme-sanmui)

## `index.js`

主题配置

```js
module.exports = {
  // routes is required
  routes: 'path-to-routes.js',

  // the following configs are optional
  lazyLoad: true,
  pick: {
    archive(markdownData) { ... },
    ...
  },
  plugins: ['eocky-plugin-san', ...],
};
```

routes 指向一个 san-router 形式的路由配置文件。

### lazyLoad: Boolean | (nodePath, nodeValue) => Boolean

> default: false

If `lazyLoad` is `false`, it means that the whole Markdown data tree will be load while users visit any page.

If `lazyLoad` is `true`, it meas that Markdown data will only be loaded while it's needed.

And `lazyLoad` could be a function, it's similar to `ture`, but you can determine whether a subtree of the Markdown data tree should be loaded lazily as one file.

**Note:** when `lazyLoad` or the returned value of `lazyLoad()` is `true`, the Markdown data(or subtree) will be wrapped in a function which will return a promise.

[**关于懒加载**](https://github.com/benjycui/bisheng/tree/master/docs/lazy-load.md).

### pick: Object { [field]: Function }

> default: {}

To get part of data from Markdown data, and then put all the snippets into `props.picked` and pass it to template.

[**关于 pick**](./pick.md).

### plugins: Array[String]

> default: []

主题依赖的插件：

```js
module.exports = {
  plugins: [
    'pluginName?config1=value1&config2=value2',
    'anotherPluginName'
  ],
};
```

你可以用上述query形式的方式对插件传入配置，参考 [webpack loaders' convention](https://www.npmjs.com/package/loader-utils#parsequery).

[**关于插件**](./plugin.md).

* [eocky-plugin-san](../packages/eocky-plugin-san)


## Templates

Templates 就是 San 的组件，他们通过 san-router 接受 markdown 数据，你可以在这些组件里使用 `this.data.get('route.config.xxx')` 的方式拿到这些数据。
