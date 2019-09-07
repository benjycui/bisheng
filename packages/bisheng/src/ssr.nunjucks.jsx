require('@babel/polyfill');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router');
const DocumentTitle = require('react-document-title');
const createElement = require('../lib/utils/create-element');
const data = require('../lib/utils/ssr-data.js');
const routes = require('{{ routesPath }}')(data);

module.exports = function ssr(url, callback) {
  ReactRouter.match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (error) {
      callback(error, '');
    } else if (redirectLocation) {
      callback(null, ''); // TODO
    } else if (renderProps) {
      try {
        const content = ReactDOMServer.renderToString(
          <ReactRouter.RouterContext
            {...renderProps}
            createElement={createElement}
          />,
        );
        const title = DocumentTitle.rewind();
        // params for extension
        callback(null, content, { title });
      } catch (e) {
        callback(e, '');
      }
    } else {
      callback(null, ''); // TODO
    }
  });
};
