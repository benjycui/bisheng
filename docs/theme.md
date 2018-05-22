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


如果 `lazyLoad` 是 `false`，markdown 数据会在你浏览的每一个页面都会全部加载。

如果 `lazyLoad` 是 `true`，所有的 markdown 数据对应的数据部分都会变成一个 函数返回 Promise 以便你做懒加载。

`lazyLoad` 也可以是一个函数，类似 `ture`。你可以通过这种方式来合并 markdown 数据构成一个 Promise。

[**关于懒加载**](./lazy-load.md).

### pick: Object { [field]: Function }

> default: {}

获取 markdown 数据中的部分数据，将它们丢到 `route.config.picked` 以传入模板。

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

Templates 就是 San 的组件，他们通过 san-router 接受 markdown 数据，你可以在这些组件里使用 `this.data.get('route.config.[data|picked|utils]')` 的方式拿到这些数据,其中：

- **route.config.data** 指向eocky.config.js文件中**source**字段指定目录下markdown文档的解析结果，参考[source](https://github.com/WindTraveler/eocky#source-string--arraystring--object-category-string--arraystring).

- **route.config.picked** 参考[pick](./theme.md#pick-object--field-function-).

- **route.config.utils**
该对象目前只包含**createSanComponent**方法，方法详情如下:

```js
/*
 *@param {obj} jsonML
 *@return {function} 基于jsonML内容的san组件构造函数
 */
function createSanComponent(jsonML){
    ...
    return san.defineComponent({...});
}
```
