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

e.g. [bisheng-theme-one](https://github.com/benjycui/bisheng-theme-one)

## `index.js`

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

## Templates

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
