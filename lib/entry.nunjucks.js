'use strict';

require('babel-polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const NProgress = require('nprogress');
const Route = ReactRouter.Route;
const Redirect = ReactRouter.Redirect;
const history = require('history');
const toCompletedRoutes = require('./utils/to-completed-routes');
const templateWrapper = require('./utils/template-wrapper.nunjucks');

const theme = require('{{ themePath }}');
theme.completedRoutes = toCompletedRoutes(theme.routes);
const dataToArray = (children) => {
  if (!children && children !== 0) {
    return [];
  }
  if (Array.isArray(children)) {
    return children;
  }
  return [children];
};
const getChildrenRoutes = (item, index) => {
  const children = item.children && dataToArray(item.children).map(getChildrenRoutes);
  const path = item.route || item.dataPath;
  return React.createElement(Route, Object.assign({}, item.props, {
    key: `route-${index}`,
    path,
    onEnter: () => NProgress.start(),
    getComponents: templateWrapper(item.template, item.dataPath),
    children,
  }));
};
const routes = theme.completedRoutes.map(getChildrenRoutes);

routes.push(React.createElement(Route, {
  key: 'not-found',
  path: '*',
  getComponents: templateWrapper('./template/NotFound'),
}));

const configRedirects = theme.redirects || {};
const redirects = Object.keys(configRedirects)
        .map((from, index) => React.createElement(Redirect, {
          key: `redirect-${index}`,
          from,
          to: configRedirects[from],
        }));

const router = React.createElement(ReactRouter.Router, {
  history: ReactRouter.useRouterHistory(history.createHistory)({
    basename: '{{ root }}',
  }),
  children: redirects.concat(routes),
});
ReactDOM.render(
  router,
  document.getElementById('react-content')
);
