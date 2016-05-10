const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const Route = ReactRouter.Route;
const chain = require('ramda/src/chain');
const toReactComponent = require('jsonml-to-react-component');
const exist = require('exist.js');
const data = require('./data.js');

const plugins = data.plugins;
const converters = chain((plugin) => plugin.converters || [], plugins);
const utils = {
  get: exist.get,
  toReactComponent(jsonml) {
    return toReactComponent(jsonml, converters);
  },
};
plugins.map((plugin) => plugin.utils || {})
  .forEach((u) => Object.assign(utils, u));

const theme = require('{{ themePath }}');
if (Array.isArray(theme.routes)) {
  theme.completedRoutes = theme.routes;
} else {
  theme.completedRoutes = Object.keys(theme.routes)
    .map((route) => {
      return {
        route,
        dataPath: route,
        template: theme.routes[route],
      };
    });
}

function templateWrapper(template, dataPath) {
  return (props) => {
    const propsPath = Object.keys(props.params).reduce((path, param) => {
      return path.replace(`:${param}`, props.params[param]);
    }, dataPath);

    return React.createElement(
      require(`{{ themePath }}/${template.replace(/^\.\//, '')}`),
      Object.assign({}, props, {
        data: data.markdown,
        pageData: exist.get(data.markdown, propsPath.split('/').slice(1), {}),
        utils,
        config: theme,
      })
    );
  };
}

const routes = theme.completedRoutes.map(
  (item, index) =>
    React.createElement(Route, {
      key: index,
      path: item.route,
      component: templateWrapper(item.template, item.dataPath),
    })
);
routes.push(React.createElement(Route, {
  key: 'not found',
  path: '*',
  component: templateWrapper('./template/NotFound'),
}));

ReactDOM.render(
  React.createElement(ReactRouter.Router, {
    history: ReactRouter.browserHistory,
    children: routes,
  }),
  document.getElementById('react-content')
);
