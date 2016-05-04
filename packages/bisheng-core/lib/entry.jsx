const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');

const data = require('./bisheng.data');

ReactDOM.render(
  React.createElement(ReactRouter.Router, { history: ReactRouter.browserHistory }),
  document.getElementById('react-content')
);