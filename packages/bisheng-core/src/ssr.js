'use strict';

/* eslint-disable no-unused-vars */
const React = require('react');
/* eslint-enable no-unused-vars */
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router');
const createElement = require('./utils/create-element');

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
