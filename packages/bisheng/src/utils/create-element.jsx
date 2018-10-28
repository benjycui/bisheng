/* eslint-disable no-unused-vars */
const React = require('react');
/* eslint-enable no-unused-vars */
const NProgress = require('nprogress-for-antd');

module.exports = function createElement(Component, props) {
  NProgress.done();
  const dynamicPropsKey = props.location.pathname;
  return <Component {...props} {...Component[dynamicPropsKey]} />;
};
