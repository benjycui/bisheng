'use strict';

/* eslint-disable no-var */
var React = require('react');

module.exports = function() {
  return {
    converters: [
      [
        function(node) { return typeof node === 'function'; },
        function(node, index) {
          return React.cloneElement(node(), { key: index });
        },
      ],
    ],
  };
};
