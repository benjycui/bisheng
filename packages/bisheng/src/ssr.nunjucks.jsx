require('@babel/polyfill');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router-3-fork');
const { Helmet } = require('react-helmet');
const createElement = require('../lib/utils/create-element');
const data = require('../lib/utils/ssr-data.js');
const routes = require('{{ routesPath }}')(data);

function getTitleStringFromHelmet(helmetTitleTmp) {
  return helmetTitleTmp.match(/<title.*>([^<]+)<\/title>/) ? helmetTitleTmp.match(/<title.*>([^<]+)<\/title>/)[1] : '';
}

module.exports = function ssr(url, callback) {
  ReactRouter.match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (error) {
      callback(error, '');
    } else if (redirectLocation) {
      callback(null, ''); // TODO
    } else if (renderProps) {
      const helmetContext = {};
      try {
        const content = ReactDOMServer.renderToString(
          <ReactRouter.RouterContext
            {...renderProps}
            createElement={(Component, props) => createElement(Component, { ...props, helmetContext })}
          />,
        );
        const helmet = helmetContext.helmet || Helmet.renderStatic();
        const documentTitle = getTitleStringFromHelmet(Helmet.renderStatic().title.toString());
        const helmetTitle = getTitleStringFromHelmet(helmet.title.toString());
        const htmlAttributes = helmet.htmlAttributes.toString();
        const meta = helmet.meta.toString();
        const link = helmet.link.toString();

        // 兼容 DocumentTitle ，推荐使用 react-helmet
        const title = documentTitle || helmetTitle;
        // params for extension
        callback(null, content, {
          title,
          meta,
          link,
          htmlAttributes,
        });
      } catch (e) {
        callback(e, '');
      }
    } else {
      callback(null, ''); // TODO
    }
  });
};
