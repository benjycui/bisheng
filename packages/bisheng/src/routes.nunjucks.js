'use strict';

const chain = require('ramda/src/chain');
const toReactElement = require('jsonml-to-react-element');
const exist = require('exist.js');
const NProgress = require('nprogress');
const NotFound = require('{{ themePath }}/template/NotFound');
const themeConfig = JSON.parse('{{ themeConfig | safe }}');

function calcPropsPath(dataPath, params) {
  return typeof dataPath === 'function' ?
    dataPath(params) :
    Object.keys(params).reduce(
    (path, param) => path.replace(`:${param}`, params[param]),
    dataPath
  );
}

function hasParams(dataPath) {
  return typeof dataPath === 'function' || dataPath.split('/').some((snippet) => snippet.startsWith(':'));
}

function defaultCollect(nextProps, callback) {
  callback(null, nextProps);
}

module.exports = function getRoutes(data) {
  const plugins = data.plugins;
  const converters = chain((plugin) => plugin.converters || [], plugins);
  const utils = {
    get: exist.get,
    toReactComponent(jsonml) {
      return toReactElement(jsonml, converters);
    },
  };
  plugins.map((plugin) => plugin.utils || {})
    .forEach((u) => Object.assign(utils, u));

  function templateWrapper(template, dataPath = '') {
    const Template = require('{{ themePath }}/template' + template.replace(/^\.\/template/, ''));

    return (nextState, callback) => {
      const propsPath = calcPropsPath(dataPath, nextState.params);
      const pageData = exist.get(data.markdown, propsPath.replace(/^\//, '').split('/'));
      const collect = Template.collect || defaultCollect;
      collect(Object.assign({}, nextState, {
        themeConfig,
        data: data.markdown,
        picked: data.picked,
        pageData,
        utils,
      }), (err, nextProps) => {
        const Comp = (hasParams(dataPath) || pageData) && err !== 404 ?
                Template.default || Template : NotFound.default || NotFound;
        const dynamicPropsKey = nextState.location.pathname;
        Comp[dynamicPropsKey] = nextProps;
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
      onEnter: () => {
        if (typeof document !== 'undefined') {
          NProgress.start();
        }
      },
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

  return processedRoutes;
};
