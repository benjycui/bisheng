const JsonML = require('jsonml.js/lib/utils');
const Prism = require('prismjs');
require('./prism-autoit')(Prism);

function getCode(node) {
  return JsonML.getChildren(
    JsonML.getChildren(node)[0] || ''
  )[0] || '';
}

function highlight(node) {
  if (!JsonML.isElement(node)) return;

  if (JsonML.getTagName(node) !== 'pre') {
    JsonML.getChildren(node).forEach(highlight);
  } else {
    JsonML.getAttributes(node).highlighted =
      Prism.highlight(getCode(node), Prism.languages.autoit);
  }
}

module.exports = (markdownData, config) => {
  highlight(markdownData.content);
  return markdownData;
};
