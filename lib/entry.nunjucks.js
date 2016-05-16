'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const history = require('history');
const Route = ReactRouter.Route;
const toCompletedRoutes = require('./utils/to-completed-routes');
const templateWrapper = require('./utils/template-wrapper.nunjucks');

const theme = require('{{ themePath }}');
theme.completedRoutes = toCompletedRoutes(theme.routes);

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
