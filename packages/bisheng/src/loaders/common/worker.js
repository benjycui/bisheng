const sourceData = require('../../utils/source-data');
const stringify = require('../../utils/stringify');

process.on('message', (task) => {
  const {
    filename,
    content,
    plugins,
    transformers,
    isBuild,
  } = task;
  const parsedMarkdown = sourceData.process(
    filename,
    content,
    plugins,
    transformers,
    isBuild,
  );
  const result = stringify(parsedMarkdown);
  process.send(result);
});
