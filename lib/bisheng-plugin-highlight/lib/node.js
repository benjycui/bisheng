'use strict';

const fs = require('fs');
const path = require('path');
const R = require('ramda');
const JsonML = require('jsonml.js/lib/utils');

const prismCore = 'prismjs/components/prism-core';
const Prism = require(prismCore);
const prismComponents = path.dirname(require.resolve(prismCore));
const prelude = [
  'prism-clike', 'prism-javascript', 'prism-markup', 'prism-c', 'prism-ruby',
  'prism-css',
];

const componentsSet = R.uniq(prelude.concat(fs.readdirSync(prismComponents))
                             .map((component) => component.replace(/(\.min)?\.js$/, '')));
componentsSet
  .forEach((component) => require(path.join(prismComponents, component)));

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

  const language = Prism.languages[JsonML.getAttributes(node).lang] ||
          Prism.languages.autoit;
  JsonML.getAttributes(node).highlighted =
    Prism.highlight(getCode(node), language);
}

module.exports = (markdownData/* , config*/) => {
  highlight(markdownData.content);
  return markdownData;
};
