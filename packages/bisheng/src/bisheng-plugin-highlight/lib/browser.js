

/* eslint-disable no-var */
var React = require('react');
var JsonML = require('jsonml.js/lib/utils');

module.exports = function () {
  return {
    converters: [
      [
        function (node) { return JsonML.isElement(node) && JsonML.getTagName(node) === 'pre'; },
        function (node, index) {
          var attr = JsonML.getAttributes(node);
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
