# Eocky

Eocky 是 [bisheng](https://github.com/benjycui/bisheng) 的一个 fork，本质上是渲染层基于 [San](https://ecomfe.github.io/san/) 的静态模板生成器。

做这个东西是我想给我自己的 San 组件写文档，但是实在找不到让我觉得非常适合的文档工具，所以就“拿来主义”地 fork 了 bisheng。

eocky 这个名字没什么特别的含义。文档俗称 doc，本来想叫 docky 但是 npm 上被占坑了，那么索性首字母 +1 叫 eocky 好了。

## Thanks to

 - [bisheng](https://github.com/benjycui/bisheng)
 - [san-markdown-loader](https://github.com/jinzhubaofu/san-markdown-loader)

## Features

* 支持 markdown 数据的[懒加载](./docs/lazy-load.md)。
* 强大的[插件](./docs/plugin.md)机制。

## Usage

说明:

```bash
npm install --save-dev eocky
```

配置[npm scripts](https://docs.npmjs.com/misc/scripts):

```json
{
  "scripts": {
    "start": "eocky start"
  }
}
```

创建`eocky.config.js`进行配置，如下是默认配置，详见：[get-bisheng-config](./packages/eocky/src/utils/get-bisheng-config.js)

```js
module.exports = {
  source: './posts',
  output: './_site',
  theme: './_theme',
  port: 8000,
};
```

**注意:** `source` 和 `theme` 字段不能为空，且 `theme` 不能是一个空文件夹。

执行 `npm start`。

## Documentation

### CLI

你可以将 `eocky` 作为命令行工具全局安装，不过更推荐作为项目的 `devDependencies` 来使用它。

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

`eocky` 会读取目录下的 `eocky.config.js` 作为其默认配置，你也可以使用 `eocky --config another.config.js` 来指定配置文件。

下面是一个配置文件的例子：

```js
module.exports = {
  port: 8000,
  source: './posts',
  output: './_site',
  theme: './_theme',
  htmlTemplate: path.join(__dirname, '../template.html'),
  devServerConfig: {},
  webpackConfig(config) {
    return config;
  },
  entryName: 'index',
  root: '/',
};
```

#### port: Number

> default: 8000

本地服务器占用的启动端口号。

#### source: String | Array[String] | Object{ [category]: String | Array[String]}

> default: './posts'

告诉 `eocky` 从哪里读取 markdown 数据。`source` 中的 markdown 数据会根据文件目录结构解析成树形结构，如下例：

输入：

```bash
posts
└── dir1
  ├── a.md
  └── b.md
```

输出：

```js
{
  dir1: {
    a: {...},
    b: {...},
  },
}
```

每一个 markdown 文件的内容是使用 [mark-twain](https://github.com/benjycui/mark-twain) 这个包解析后的结果，你可以借助 `eocky` 的插件机制对数据进行预处理。

#### exclude: RegExp

> default: null

你不想解析某个 markdown 文件的话，在这里配置。

#### output: String

> default: './_site'

执行 build 命令后的输出目录

#### theme: String

> default: './_theme'

主题的路径，可以是 path，也可以是一个 npm 包。

[**More about theme**](./docs/theme.md).

* [eocky-theme-sanmui](./packages/eocky-theme-sanmui)

#### themeConfig: any

> undefined

你希望在主题中拿到的一些配置。如果你是一个主题开发者，这些配置在[这里](./packages/eocky/src/routes.nunjucks.js#24)传入了 san-router。因此你在主题中可以使用 `this.data.get('route.config.themeConfig')`拿到他们。

#### htmlTemplate: String

> default: [`eocky/lib/template.html`](./packages/eocky/src/template.html)

站点所使用的 HTML 模板，因为是 SPA 所以只有一个。

**注意:** 该模板使用 [nunjucks](https://mozilla.github.io/nunjucks/) 这一模板殷勤，用于注入数据，这部分数据包括

* [`root`](#root-string)
* 你传给 [htmlTemplateExtraData](#htmltemplateextradata-object) 的所有属性。

#### htmlTemplateExtraData: Object

> default: `{}`

你用来渲染模板的额外数据 [htmlTemplate](#htmltemplate-string).

#### devServerConfig: Object

> default: {}

详见 [webpack-dev-server 文档](https://webpack.js.org/configuration/dev-server/).

#### webpackConfig: (config) => config

> default: (config) => config

用于修改我们默认的 webpack 配置，默认的 webpack 配置在[这里](./packages/eocky/src/config)。

#### transformers: Object[]

> [{ test: /\.md$/, use: [MarkdownTransformer](./packages/eocky/src/transformers/markdown.js) }]

你可以用这个字段来处理 markdown 之外的静态文件，当然，一般应该用不到。

#### entryName: String

> default: 'index'

webpack 生成文件的文件名，`[entryName].js` & `[entryName].css`.

#### root: String

> default: '/'

如果该站点被用在了某域名的子目录下，你可能会需要这个字段。

## License

MIT
