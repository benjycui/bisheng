'use strict';

const JsonML = require('jsonml.js/lib/utils');

function isHeading(tagName) {
  return /^h[1-6]$/i.test(tagName);
}

module.exports = (markdownData, config) => {
  const maxDepth = config.maxDepth || 6;
  markdownData.toc = JsonML.getChildren(markdownData.content).filter((node) => {
    const tagName = JsonML.getTagName(node);
    return isHeading(tagName) && +tagName.charAt(1) <= maxDepth;
  });

  return markdownData;
};
