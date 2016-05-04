const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const data = require('./loaders/bisheng.data');

function templateWrapper(Template) {
  return (props) => {
    return React.createElement(
      Template,
      Object.assign({}, props, { data: data.markdown})
    );
  };
}

const theme = data.theme;
const routes = Object.keys(theme.routes).map((path, index) => {
  return React.createElement(ReactRouter.Route, {
    key: index,
    path,
    component: templateWrapper(theme.routes[path]),
  });
});

ReactDOM.render(
  React.createElement(ReactRouter.Router, {
    history: ReactRouter.browserHistory,
    children: routes,
  }),
  document.getElementById('react-content')
);
