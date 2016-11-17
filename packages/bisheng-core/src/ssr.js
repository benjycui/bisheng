'use strict';

/* eslint-disable no-unused-vars */
const React = require('react');
/* eslint-enable no-unused-vars */
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router');
const NProgress = require('nprogress');

function createElement(Component, props) {
  NProgress.done();
  return <Component {...props} {...Component.dynamicProps} />;
}

module.exports = function ssr(routes, url, callback) {
  ReactRouter.match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (error) {
      callback('');
    } else if (redirectLocation) {
      callback(''); // TODO
    } else if (renderProps) {
      const content = ReactDOMServer.renderToString(
        <ReactRouter.RouterContext {...renderProps} createElement={createElement} />
      );
      callback(content);
    } else {
      callback(''); // TODO
    }
  });
};
