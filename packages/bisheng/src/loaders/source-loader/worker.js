const sourceData = require('../../utils/source-data');
const stringify = require('../../utils/stringify');

process.on('message', (task) => {
  const {
    filename,
    content,
    plugins,
    isBuild,
  } = task;
  const parsedMarkdown = sourceData
          .process(filename, content, plugins, isBuild);
  const result = `module.exports = ${stringify(parsedMarkdown)};`;
  process.send(result);
});
