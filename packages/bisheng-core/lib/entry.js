const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const Route = ReactRouter.Route;
const chain = require('ramda/src/chain');
const toReactComponent = require('jsonml-to-react-component');
const exist = require('exist.js');
const data = require('./loaders/bisheng.data');

const plugins = data.plugins;
const converters = chain((plugin) => plugin.converters || [], plugins);
const utils = {
  get: exist.get,
  toReactComponent(jsonml) {
    return toReactComponent(jsonml, converters);
  },
};
plugins.map((plugin) => plugin.utils || {})
  .forEach((u) => Object.assing(utils, u));

const theme = data.theme;
function templateWrapper(Template) {
  return (props) => React.createElement(
    Template,
    Object.assign({}, props, {
      data: data.markdown,
      utils,
      config: theme,
    })
  );
}

const routes = Object.keys(theme.routes).map(
  (path, index) =>
    React.createElement(Route, {
      key: index,
      path,
      component: templateWrapper(theme.routes[path]),
    })
);
routes.push(React.createElement(Route, {
  key: 'not found',
  path: '*',
  component: templateWrapper(data.notFound),
}));

ReactDOM.render(
  React.createElement(ReactRouter.Router, {
    history: ReactRouter.browserHistory,
    children: routes,
  }),
  document.getElementById('react-content')
);
