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
    const tagName = JsonML.getTagName(node);
    const headingNodeChildren = JsonML.getChildren(node);
    const headingText = headingNodeChildren.map((node) => {
      if (JsonML.isElement(node)) {
        if (JsonML.hasAttributes(node)) {
          return node[2] || '';
        }
        return node[1] || '';
      }
      return node;
    }).join('');
    const headingTextId = headingText.trim().replace(/\s+/g, '-');
    return [
      'li', [
        'a',
        {
          className: `bisheng-toc-${tagName}`,
          href: `#${headingTextId}`,
        },
      ].concat(config.keepElem ? headingNodeChildren : [headingText]),
    ];
  });

  markdownData.toc = ['ul'].concat(listItems);
  return markdownData;
};
