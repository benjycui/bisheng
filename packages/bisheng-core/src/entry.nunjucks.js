'use strict';

require('babel-polyfill');
require('nprogress/nprogress.css');

/* eslint-disable no-unused-vars */
const React = require('react');
/* eslint-enable no-unused-vars */
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const NProgress = require('nprogress');
const history = require('history');
const data = require('../lib/utils/data.js');
const routes = require('{{ routesPath }}')(data);

function createElement(Component, props) {
  NProgress.done();
  return <Component {...props} {...Component.dynamicProps} />;
}

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;
const basename = '{{ root }}';
ReactRouter.match({ routes, location, basename }, () => {
  const router =
    <ReactRouter.Router
      history={ReactRouter.useRouterHistory(history.createHistory)({ basename })}
      routes={routes}
      createElement={createElement}
    />;
  ReactDOM.render(
    router,
    document.getElementById('react-content')
  );
});
