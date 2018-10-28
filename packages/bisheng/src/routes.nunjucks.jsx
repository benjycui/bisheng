const chain = require('ramda/src/chain');
const toReactElement = require('jsonml-to-react-element');
const exist = require('exist.js');
const NProgress = require('nprogress-for-antd');
const NotFound = require('{{ themePath }}/template/NotFound');
const themeConfig = JSON.parse('{{ themeConfig | safe }}');

function calcPropsPath(dataPath, params) {
  return typeof dataPath === 'function' ?
    dataPath(params) :
    Object.keys(params).reduce(
    (path, param) => path.replace(`:${param}`, params[param]),
    dataPath,
  );
}

function generateUtils(data, props) {
  const plugins = data.plugins.map(pluginTupple => pluginTupple[0](pluginTupple[1], props));
  const converters = chain(plugin => plugin.converters || [], plugins);
  const utils = {
    get: exist.get,
    toReactComponent(jsonml) {
      return toReactElement(jsonml, converters);
    },
  };
  plugins.map(plugin => plugin.utils || {})
    .forEach(u => Object.assign(utils, u));
  return utils;
}

async function defaultCollector(nextProps) {
  return nextProps;
}

module.exports = function getRoutes(data) {
  function templateWrapper(template, dataPath = '') {
    const Template = require(`{{ themePath }}/template${template.replace(/^\.\/template/, '')}`);

    return (nextState, callback) => {
      const propsPath = calcPropsPath(dataPath, nextState.params);
      const pageData = exist.get(data.markdown, propsPath.replace(/^\//, '').split('/'));
      const utils = generateUtils(data, nextState);

      const collector = (Template.default || Template).collector || defaultCollector;
      const dynamicPropsKey = nextState.location.pathname;
      const nextProps = {
        ...nextState,
        themeConfig,
        data: data.markdown,
        picked: data.picked,
        pageData,
        utils,
      };
      collector(nextProps)
        .then((collectedValue) => {
          try {
            const Comp = Template.default || Template;
            Comp[dynamicPropsKey] = { ...nextProps, ...collectedValue };
            callback(null, Comp);
          } catch (e) { console.error(e) }
        })
        .catch((err) => {
          const Comp = NotFound.default || NotFound;
          Comp[dynamicPropsKey] = nextProps;
          callback(err === 404 ? null : err, Comp);
        });
    };
  }

  const themeRoutes = JSON.parse('{{ themeRoutes | safe }}');
  const routes = Array.isArray(themeRoutes) ? themeRoutes : [themeRoutes];

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
          route.indexRoute.dataPath || route.indexRoute.path,
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
