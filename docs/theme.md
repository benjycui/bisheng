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
    path: '/',
    component: './template/Archive',
    
    // optional, it's equal to `path` if omitted.
    dataPath: 'path-to-markdwon-file',
    ...
  },

  // theme's own config goes here...
  config1: ...,
  config2: ...,
  ...
};
```

The configuration of `routes` is similar with [react-router's](https://github.com/reactjs/react-router/blob/master/docs/guides/RouteConfiguration.md#configuration-with-plain-routes). The differences are:

* `component` should be a string which is a path of a component.
* `dataPath` means which Markdown file need to be rendered.

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
