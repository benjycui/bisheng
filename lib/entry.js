'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const history = require('history');
const Route = ReactRouter.Route;
const chain = require('ramda/src/chain');
const toReactComponent = require('jsonml-to-react-component');
const exist = require('exist.js');
const NotFound = require('{{ themePath }}/template/NotFound');
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

const theme = require('{{ themePath }}');
theme.completedRoutes = toCompletedRoutes(theme.routes);

function calcPropsPath(dataPath, params) {
  return Object.keys(params).reduce(
    (path, param) => path.replace(`:${param}`, params[param]),
    dataPath
  );
}

function hasParams(dataPath) {
  return dataPath.split('/').some((snippet) => snippet.startsWith(':'));
}

function templateWrapper(template, dataPath = '') {
  const Template = require(`{{ themePath }}/${template.replace(/^\.\//, '')}`);

  return (props) => {
    const propsPath = calcPropsPath(dataPath, props.params);
    const pageData = exist.get(data.markdown, propsPath.split('/').slice(1));

    return React.createElement(
      !hasParams(dataPath) || pageData ? Template : NotFound,
      Object.assign({}, props, {
        data: data.markdown,
        pageData: pageData || {},
        utils,
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
    history: ReactRouter.useRouterHistory(history.createHistory)({
      basename: '{{ root }}',
    }),
    children: routes,
  }),
  document.getElementById('react-content')
);
