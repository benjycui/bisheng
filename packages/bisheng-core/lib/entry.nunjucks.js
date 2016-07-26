'use strict';

require('babel-polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const NProgress = require('nprogress');
const history = require('history');
const templateWrapper = require('./utils/template-wrapper.nunjucks');

const theme = require('{{ themePath }}');
const routes = Array.isArray(theme.routes) ? theme.routes : [theme.routes];

function processRoutes(route) {
  if (Array.isArray(route)) {
    return route.map(processRoutes);
  }

  return Object.assign({}, route, {
    onEnter: () => NProgress.start(),
    component: undefined,
    getComponents: templateWrapper(route.component, route.dataPath || route.path),
    childRoutes: route.childRoutes && route.childRoutes.map(processRoutes),
  });
}

const processedRoutes = processRoutes(routes);
processedRoutes.push({
  path: '*',
  getComponents: templateWrapper('./template/NotFound'),
});

const router = React.createElement(ReactRouter.Router, {
  history: ReactRouter.useRouterHistory(history.createHistory)({
    basename: '{{ root }}',
  }),
  routes: processedRoutes,
});
ReactDOM.render(
  router,
  document.getElementById('react-content')
);
