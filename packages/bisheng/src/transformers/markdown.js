const markTwain = require('mark-twain');
const { toUriPath } = require('../utils/escape-win-path');

module.exports = function (filename, fileContent) {
  const markdown = markTwain(fileContent);
  markdown.meta.filename = toUriPath(filename);
  return markdown;
};
