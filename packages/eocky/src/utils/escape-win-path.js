// require('D:\ant-design') will throw a module not found error need to escape `\` to `\\`.
// Note that this is only required when you persist code to file
function escapeWinPath(path) {
  return path.replace(/\\/g, '\\\\');
}

function toUriPath(path) {
  return path.replace(/\\/g, '/');
}

module.exports = {
  escapeWinPath,
  toUriPath,
};
