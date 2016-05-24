'use strict';

const React = require('react');
const JsonML = require('jsonml.js/lib/utils');

module.exports = (/* config */) => {
  return {
    converters: [
      [
        (node) => JsonML.isElement(node) && JsonML.getTagName(node) === 'pre',
        (node, index) => {
          const attr = JsonML.getAttributes(node);
          return React.createElement('pre', {
            key: index,
            className: `language-${attr.lang}`,
          }, React.createElement('code', {
            dangerouslySetInnerHTML: { __html: attr.highlighted },
          }));
        },
      ],
    ],
  };
};
