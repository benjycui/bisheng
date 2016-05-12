# Bi Sheng

> [Bi Sheng](https://en.wikipedia.org/wiki/Bi_Sheng) was the Chinese inventor of the first known movable type technology.

`bisheng` is designed to transform [Markdown](https://en.wikipedia.org/wiki/Markdown) into static websites and blogs using [React](https://facebook.github.io/react/).

## Usage

### Use `bisheng` in a new project

```bash
git clone git@github.com:benjycui/bisheng-theme-one.git myblog && cd myblog
rm -rf .git && npm i && npm start
open http://127.0.0.1:8000/
```

### Use `bisheng` in current project

Installation:

```bash
npm install --save-dev bisheng
```

Then, add `start` to [npm scripts](https://docs.npmjs.com/misc/scripts):

```json
{
  "scripts": {
    "start": "bisheng start"
  }
}
```

Create `bisheng.config.js`, otherwise `bisheng` will use the default config:

```js
module.exports = {
  source: './posts',
  output: './_site',
  theme: './_theme',
  port: 8000,
};
```

**Note:** please make sure that `source` and `theme` exists, and `theme` should not be an empty directory. Just copy [bisheng-theme-one](https://github.com/benjycui/bisheng-theme-one) to `theme`, if you don't konw how to develop a theme.

Now, just run `npm start`.

## Documentation

### CLI

We can install `bisheng` as a cli command and explore what it can do by `bisheng -g`. However, the recommanded way to use `bisheng` is that install it as `devDependencies`.

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

`bisheng` will read `bisheng.config.js` as its config file, but we can set the config file name by `--config`, something like this `bisheng --config another.config.js`.

The content of `bisheng.config.js` looks like this:

```js
module.exports = {
  source: './posts',
  output: './_site',
  theme: './_theme',
  port: 8000,
  root: '/',
  plugins: [],
};
```

#### source: String|Array[String]

To set directory/directories where we place markdown files.

#### output: String

To set directory where `bisheng` will generate (HTML & CSS & JavaScript) files to.

#### theme: String

To set directory where we put the theme of website.

#### port: Number

To set the port which will be used when start a local server.

#### root: String

If the website will be deploy under a sub-directory of a domain(something like `http://benjycui.github.io/bisheng-theme-one/`), we must set it(such as `/bisheng-theme-one/`).

#### plugins

// TBD

### Theme

A theme includes a config file and styles as well as templates. The directory structure of a theme is:

```bash
theme
├── index.js # config file, required
├── static # style files
│   └── style.css
└── template # templates are JSX files
    └── Template.jsx
```

e.g. [bisheng-theme-one](https://github.com/benjycui/bisheng-theme-one)

#### `index.js`

`index.js` includes `routes` and theme's own config.

```js
module.exports = {
  // routes is required
  routes: {
    '/': './template/Archive',
    ...
  },

  // theme's own config goes here...
  config1: ...,
  config2: ...,
  ...
};
```

`routes` could be an array, something like this:

```js
[{
  route: '/posts/:post',
  dataPath: '/_posts/:post',
  template: './template/Post',
},
  ...
]
```

This means when a user visits `/post/hello-world`, `bisheng` will render `./template/Post` with page data `data['_post']['hello-world']`.

If `routes` is an object, `bisheng` will process key as `route` and `dataPath`, and value as template.

#### Templates

A template is just a React component, `bisheng` will pass `data` `pageData` `utils` and all the [react-router](https://github.com/reactjs/react-router) props to it.

* `data` is generated from Markdown files in `source`(see: `bisheng.config.js`), and the structure of `data` is the same as directories' structure:
  ```js
  {
    posts: {
      'hello-world': ...,
      ...
    },
  }
  ```
  Every Markdown file will be parsed as an object by [mark-twain](https://github.com/benjycui/mark-twain).
* `pageData` is the content of a specific Markdown file. Actually, `bisheng` just get it from `data`.
* `uitls` includes `bisheng`'s and plugins' utilities:
  * `utils.toReactComponent` to convert JsonML to React component.

### Plugins

// TBD

## Liscense

MIT
