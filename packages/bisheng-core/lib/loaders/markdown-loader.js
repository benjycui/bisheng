const markTwain = require('mark-twain');

module.exports = (content) => {
  if (this.cacheable) {
    this.cacheable();
  }
  return `module.exports = ${JSON.stringify(markTwain(content), null, 2)};`;
};
