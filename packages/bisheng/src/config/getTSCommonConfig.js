export default function ts(tsConfig) {
  return {
    target: 'es6',
    jsx: 'preserve',
    moduleResolution: 'node',
    declaration: false,
    ...tsConfig,
  };
}
