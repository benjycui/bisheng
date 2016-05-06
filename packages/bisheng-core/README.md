# Bi Sheng

> [Bi Sheng](https://en.wikipedia.org/wiki/Bi_Sheng) was the Chinese inventor of the first known movable type technology.

`bisheng` is designed to transform [Markdown](https://en.wikipedia.org/wiki/Markdown) into static websites and blogs using [React](https://facebook.github.io/react/).

## Usage

### Use `bisheng` in a new project

```bash
git clone git@github.com:benjycui/bisheng-theme-one.git myblog && cd myblog
rm -rf .git && npm i && npm start
open http://127.0.0.1:8000/
```

### Use `bisheng` in current project

Installation:

```bash
npm install --save-dev bisheng
```

Then, add `start` to [npm scripts](https://docs.npmjs.com/misc/scripts):

```json
{
  "scripts": {
    "start": "bisheng start"
  }
}
```

Create `bisheng.config.js`, otherwise `bisheng` will use the default config:

```js
module.exports = {
  source: './posts',
  extension: '.md',
  output: './_site',
  theme: './_theme',
  port: 8000,
};
```

**Note:** please make sure that `source` and `theme` exists, and `theme` should not be an empty directory. Just copy [bisheng-theme-one](https://github.com/benjycui/bisheng-theme-one) to `theme`, if you don't konw how to develop a theme.

Now, just run `npm start`.

## Documentation

// TBD

## Liscense

MIT
