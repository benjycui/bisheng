'use strict';

const chain = require('ramda/src/chain');
const toReactComponent = require('jsonml-to-react-component');
const exist = require('exist.js');
const NProgress = require('nprogress');
const NotFound = require('{{ themePath }}/template/NotFound');

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

module.exports = function getRoutes(data) {
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
        const Comp = (hasParams(dataPath) || pageData) && err !== 404 ?
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
