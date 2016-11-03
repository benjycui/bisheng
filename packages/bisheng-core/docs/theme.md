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
    childRoutes: [{
      path: 'posts/:post',
      component: './template/Post',

      // we can use variables in `dataPath`, and values of variables are equal to them in path
      dataPath: 'posts/:post',
    }],
  },

  // theme's own config goes here...
  // and it's recommended to extract variables from theme to here
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

* `data` contains the whole Markdown data tree which is generated from [`source`](https://github.com/benjycui/bisheng#source-string--arraystring--object-category-string--arraystring).
* `pageData` is the content of a specific Markdown file. Actually, `bisheng` just get it from `data`. `bisheng` will determine which Markdown data should be pass as `pageData` by the configuration of `path` & `dataPath` in routes, for example:
  1. User visits `/posts/hello-world`.
  2. The URL matches the route `/posts/:post`.
  3. The corresponding `dataPath` is `/posts/:post`.
  4. So, `bisheng` will get `data.posts['hello-world']` and pass it as `pageData` to template.
* `uitls` includes `bisheng`'s and plugins' utilities:
  * `utils.toReactComponent` to convert JsonML to React component.
  * `utils.get` to get nested value from an object, it's from [exist.js](https://github.com/benjycui/exist.js#existgetobj-nestedprop-defaultvalue).
