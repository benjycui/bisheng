require('@babel/polyfill');
require('nprogress-for-antd/nprogress.css');

/* eslint-disable no-unused-vars */
const React = require('react');
/* eslint-enable no-unused-vars */
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const history = require('history');
const data = require('../lib/utils/data.js');
const createElement = require('../lib/utils/create-element');
const routes = require('{{ routesPath }}')(data);

let createRoot;
try {
  // eslint-disable-next-line global-require, import/no-unresolved
  ({ createRoot } = require('react-dom/client'));
} catch (e) {
  // Do nothing;
}

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;
const basename = '{{ root }}';
ReactRouter.match({ routes, location, basename }, () => {
  const router = (
    <ReactRouter.Router
      history={ReactRouter.useRouterHistory(history.createHistory)({ basename })}
      routes={routes}
      createElement={createElement}
    />
  );

  if (createRoot) {
    createRoot(document.getElementById('react-content')).render(router);
  } else {
    ReactDOM.render(router, document.getElementById('react-content'));
  }
});
