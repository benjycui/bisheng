'use strict';

/* eslint-disable no-unused-vars */
const React = require('react');
/* eslint-enable no-unused-vars */
const NProgress = require('nprogress');

module.exports = function createElement(Component, props) {
  NProgress.done();
  return <Component {...props} {...Component.dynamicProps} />;
};
