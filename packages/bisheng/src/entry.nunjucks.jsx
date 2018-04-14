require('babel-polyfill');
require('nprogress/nprogress.css');

/* eslint-disable no-unused-vars */
const React = require('react');
/* eslint-enable no-unused-vars */
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const history = require('history');
const createHashHistory = require('history/lib/createHashHistory');
const data = require('../lib/utils/data.js');
const createElement = require('../lib/utils/create-element');
const routes = require('{{ routesPath }}')(data);

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;
const basename = '{{ root }}';
const historyMode = '{{history}}';
ReactRouter.match({ routes, location, basename }, () => {
  const createHistory = historyMode === 'browser'
    ? history.createHistory
    : (createHashHistory.default || createHashHistory);
  const router = (
    <ReactRouter.Router
      history={ReactRouter.useRouterHistory(createHistory)({ basename })}
      routes={routes}
      createElement={createElement}
    />
  );
  ReactDOM.render(
    router,
    document.getElementById('react-content'),
  );
});
