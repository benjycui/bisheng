const JsonML = require('jsonml.js/lib/utils');
const Prism = require('prismjs/components/prism-core');
require('prismjs/components/prism-autoit');
require('prismjs/components/prism-clike');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-jsx');

function getCode(node) {
  return JsonML.getChildren(
    JsonML.getChildren(node)[0] || ''
  )[0] || '';
}

function highlight(node) {
  if (!JsonML.isElement(node)) return;

  if (JsonML.getTagName(node) !== 'pre') {
    JsonML.getChildren(node).forEach(highlight);
    return;
  }

  const lang = Prism.languages[JsonML.getAttributes(node).lang] ||
          Prism.languages.autoit;
  JsonML.getAttributes(node).highlighted =
    Prism.highlight(getCode(node), lang);
}

module.exports = (markdownData, config) => {
  highlight(markdownData.content);
  return markdownData;
};
