'use strict';

require('babel-polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const NProgress = require('nprogress');
require('nprogress/nprogress.css');
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
    getComponent: templateWrapper(route.component, route.dataPath || route.path),
    indexRoute: route.indexRoute && Object.assign({}, route.indexRoute, {
      component: undefined,
      getComponent: templateWrapper(
        route.indexRoute.component,
        route.indexRoute.dataPath || route.indexRoute.path
      ),
    }),
    childRoutes: route.childRoutes && route.childRoutes.map(processRoutes),
  });
}

const processedRoutes = processRoutes(routes);
processedRoutes.push({
  path: '*',
  getComponents: templateWrapper('./template/NotFound'),
});

function createElement(Component, props) {
  NProgress.done();
  return React.createElement(Component, Object.assign({}, props, Component.dynamicProps));
}

const router = React.createElement(ReactRouter.Router, {
  history: ReactRouter.useRouterHistory(history.createHistory)({
    basename: '{{ root }}',
  }),
  routes: processedRoutes,
  createElement,
});
ReactDOM.render(
  router,
  document.getElementById('react-content')
);
