'use strict';

const JsonML = require('jsonml.js/lib/utils');

function isHeading(tagName) {
  return /^h[1-6]$/i.test(tagName);
}

module.exports = (markdownData, config) => {
  const maxDepth = config.maxDepth || 6;

  const listItems = JsonML.getChildren(markdownData.content).filter((node) => {
    const tagName = JsonML.getTagName(node);
    return isHeading(tagName) && +tagName.charAt(1) <= maxDepth;
  }).map((node) => {
    const headingText = JsonML.getChildren(node)[0];
    return [
      'li',
      [
        'a',
        { href: `#${headingText}` },
        headingText,
      ],
    ];
  });

  markdownData.toc = ['ul'].concat(listItems);
  return markdownData;
};
