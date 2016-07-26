'use strict';

const chain = require('ramda/src/chain');
const toReactComponent = require('jsonml-to-react-component');
const exist = require('exist.js');
const NotFound = require('{{ themePath }}/template/NotFound');
const data = require('./data.js');
const NProgress = require('nprogress');
require('nprogress/nprogress.css');

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
module.exports = function templateWrapper(template, dataPath = '') {
  const Template = require(`{{ themePath }}/template${template.replace(/^\.\/template/, '')}`);

  return (nextState, callback) => {
    const propsPath = calcPropsPath(dataPath, nextState.params);
    const pageData = exist.get(data.markdown, propsPath.replace(/^\//, '').split('/'));
    const collect = Template.collect || defaultCollect;
    collect(Object.assign({}, nextState, {
      data: data.markdown,
      pageData,
      utils,
    }), (err, nextProps) => {
      NProgress.done();
      const Comp = !hasParams(dataPath) || pageData ?
              Template.default || Template : NotFound;
      Comp.dynamicProps = nextProps;
      callback(err, Comp);
    }, callback, NProgress);
  };
};
