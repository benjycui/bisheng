const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');

const data = require('./loaders/bisheng.data');
const theme = data.theme;
const routes = Object.keys(theme.routes).map((path, index) => {
  return React.createElement(ReactRouter.Route, {
    key: index,
    path,
    component: theme.routes[path],
  });
});
console.log(routes);
ReactDOM.render(
  React.createElement(ReactRouter.Router, {
    history: ReactRouter.browserHistory,
    children: routes,
  }),
  document.getElementById('react-content')
);
