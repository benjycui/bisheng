'use strict';

const JsonML = require('jsonml.js/lib/utils');

module.exports = (markdownData) => {
  const content = markdownData.content;
  const contentChildren = JsonML.getChildren(content);
  const dividerIndex = contentChildren.findIndex((node) => JsonML.getTagName(node) === 'hr');

  if (dividerIndex >= 0) {
    markdownData.description = ['section']
      .concat(contentChildren.slice(0, dividerIndex));
    markdownData.content = [
      JsonML.getTagName(content),
      JsonML.getAttributes(content) || {},
    ].concat(contentChildren.slice(dividerIndex + 1));
  }

  return markdownData;
};
