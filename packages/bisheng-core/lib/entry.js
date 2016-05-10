const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const history = require('history');
const Route = ReactRouter.Route;
const chain = require('ramda/src/chain');
const toReactComponent = require('jsonml-to-react-component');
const exist = require('exist.js');
const data = require('./data.js');
const toCompletedRoutes = require('./utils/to-completed-routes');

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

/* eslint-disable import/no-unresolved */
const theme = require('{{ themePath }}');
/* eslint-enable import/no-unresolved */
theme.completedRoutes = toCompletedRoutes(theme.routes);

function templateWrapper(template, dataPath = '') {
  /* eslint-disable react/prop-types */
  return (props) => {
    const propsPath = Object.keys(props.params).reduce(
      (path, param) => path.replace(`:${param}`, props.params[param])
    , dataPath);

    return React.createElement(
      /* eslint-disable global-require, import/no-unresolved */
      require(`{{ themePath }}/${template.replace(/^\.\//, '')}`),
      /* eslint-disable global-require, import/no-unresolved */
      Object.assign({}, props, {
        data: data.markdown,
        pageData: exist.get(data.markdown, propsPath.split('/').slice(1), {}),
        utils,
      })
    );
  };
  /* eslint-enable react/prop-types */
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
    history: ReactRouter.useRouterHistory(history.createHistory)({
      basename: '{{ root }}'
    }),
    children: routes,
  }),
  document.getElementById('react-content')
);
