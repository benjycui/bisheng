'use strict';

require('babel-polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const NProgress = require('nprogress');
require('nprogress/nprogress.css');
const history = require('history');

const chain = require('ramda/src/chain');
const toReactComponent = require('jsonml-to-react-component');
const exist = require('exist.js');
const NotFound = require('{{ themePath }}/template/NotFound');
const data = require('../lib/utils/data.js');

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

function calcPropsPath(dataPath, params) {
  return Object.keys(params).reduce(
    (path, param) => path.replace(`:${param}`, params[param]),
    dataPath
  );
}

function hasParams(dataPath) {
  return dataPath.split('/').some((snippet) => snippet.startsWith(':'));
}

function defaultCollect(nextProps, callback) {
  callback(null, nextProps);
}
function templateWrapper(template, dataPath = '') {
  const Template = require('{{ themePath }}/template' + template.replace(/^\.\/template/, ''));

  return (nextState, callback) => {
    const propsPath = calcPropsPath(dataPath, nextState.params);
    const pageData = exist.get(data.markdown, propsPath.replace(/^\//, '').split('/'));
    const collect = Template.collect || defaultCollect;
    collect(Object.assign({}, nextState, {
      data: data.markdown,
      picked: data.picked,
      pageData,
      utils,
    }), (err, nextProps) => {
      const Comp = (!hasParams(dataPath) || pageData) && err !== 404 ?
              Template.default || Template : NotFound;
      Comp.dynamicProps = nextProps;
      callback(err === 404 ? null : err, Comp);
    });
  };
}

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
    basename: '{{ root }}{{ entryName }}',
  }),
  routes: processedRoutes,
  createElement,
});
ReactDOM.render(
  router,
  document.getElementById('react-content')
);
