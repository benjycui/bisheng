---
title: 使用
---
## 使用

### 一次性加载全部 san-mui 组件

```js
// 引入全部组件，从中选取需要的组件
import {Button, DatePicker, Uploader} from 'san-mui';

// 引入全部样式
import 'san-mui/lib/index.css';
```

### 只引入部分的组件

```js
// 只引入 Button 和它需要的样式文件
import Button from 'san-mui/lib/Button';
import 'san-mui/lib/Button.css';
```

## 在 webpack 中使用 san-mui

在目前流行的构建工具 webpack 可以很容易地使用 san-mui。

由于 san-mui 内置了 material-design 的字体，除了必要的 js / css loader 之外，还需要一个 `file-loader` 来支持。

Webpack2 配置文件示例：

```js
let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
};
```

## 在 AMD loader 中使用 san-mui

san-mui 提供了 `umd` 的模块封装，所以可以在 AMD loader 中来使用。但由于 AMD loader 不能自动生成依赖相关信息，因此建议使添加 san-mui 的依赖包。

AMD config 配置示例：

```js
require.config({
    baseUrl: '.',
    paths: {
        'san': 'path/to/your/dependences/san/dist/san.dev',
        'classnames': 'path/to/your/dependences/classnames/index',
        'dom-align': 'path/to/your/dependences/dom-align/lib/index',
        'moment': 'path/to/your/dependences/moment/moment'
    },
    packages: [
        {
            name: 'san-mui',
            location: 'path/to/your/dependences/san-mui',
            main: 'lib/index.js'
        }
    ]
});
```

然后你就可以在代码中使用 san-mui 了。

```js
define(function (require) {

    var Button = require('san-mui/lib/Button/index').default;

    // here goes your code

});
```


## 更多示例

我们提供了两个简易的 demo 供大家参考：

1. [san-mui + webpack](https://github.com/jinzhubaofu/san-mui-examples/tree/master/san-mui-with-webpack)
2. [san-mui + AMD loader](https://github.com/jinzhubaofu/san-mui-examples/tree/master/san-mui-with-amd)

关于更多组件的使用请参考[组件](#/components/AppBar)
