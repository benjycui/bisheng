const markTwain = require('mark-twain');

module.exports = (content) => `module.exports = ${JSON.stringify(markTwain(content), null, 2)};`;
