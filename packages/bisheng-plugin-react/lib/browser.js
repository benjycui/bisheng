'use strict';

const React = require('react');

module.exports = () => {
  return {
    converters: [
      [
        (node) => typeof node === 'function',
        (node, index) => {
          return React.cloneElement(node(), { key: index });
        },
      ],
    ],
  };
};
