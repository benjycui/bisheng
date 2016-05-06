const React = require('react');
const JsonML = require('jsonml.js/lib/utils');

module.exports = (config) => {
  return {
    converters: [
      [(node) => JsonML.getTagName(node) === 'pre', (node, index) => {
        return React.createElement('pre', { key: index }, React.createElement('code', {
          dangerouslySetInnerHTML: { __html: JsonML.getAttributes(node).highlighted },
        }));
      }]
    ],
  };
};
