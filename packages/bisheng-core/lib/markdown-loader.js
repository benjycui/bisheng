const MT = require('mark-twain');

module.exports = function(content) {
  return `module.exports = ${JSON.stringify(MT(content), null, 2)};`;
};
