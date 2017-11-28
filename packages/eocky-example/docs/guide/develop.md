---
title: 开发
---
## 如何开发 san-mui 组件

### 项目结构规范

1. 所有的源码放置在 src 目录下
1. 每个组件/每类组件使用 src 下的一个目录，比如 src/Button；此外：
    1. 每个组件目录的命名必须是符合驼峰格式，即 `MyAnotherComponent`。
    1. 每个组件目录需要提供一个 index.js 输出所有组件；
    1. 每个组件目录需要提供一个 index.styl 输出所有组件的样式；
1. 测试用例需要放置在 test 目录下，其他要求与组件源码的组织风格一致。
1. 所有的 demo 和文档都放置在 example 目录下，文档的编写请参考现有的文档

### 组件开发规范

1. 首先应当遵守 [efe-tc 代码规范](https://github.com/ecomfe/spec)    
1. 每个组件应使用纯 js 方式编写，不可以使用 `.san` 格式编写。
1. 每个组件需要有配套的测试用例
1. 不要在 `.js` 中引入其他类型的文件，包括 `.styl`。例如以下写法是不允许的：

    ```js
    import from '../Button.styl';
    ```

    > WARNING: 构建时会报错的

1. 使用 `import` 引入依赖模块时不允许添加 `.js` 后缀。例如以下写法是不允许的：

    ```js
    import Button from '../Button/Button.js';
    ```

    > WARNING: 构建时会报错的

1. 不允许有空白的生命周期函数，例如

    ```js
    san.defineComponent({
        inited() {
        }
    });
    ```

1. 每个组件都必须明确地添加 `dataTypes`
1. 每个组件都必须编写测试用例，覆盖率必须达到 90% 以上
1. 每个组件完成开发后需要在 `src/index.js` 和 `src/index.styl` 中引入


### 开发模式

1. 请在 `develop` 分支基础上进行开发，即以当前 develop 为 base 分支，新建出自己的 feature-xxx 分支进行开发。

    > 如果有同步代码的需要，可以将 feature-xxx 分支可以 push 到 github 上

2. 在 feature 分支上完成开发后，发起 pull request 进行 code review；

    > pull request 需要发给 develop 分支

3. 当规划的里程牌完成时，由 develop 分支合入 master，添加 tag 并发布新的 npm 版本。

    > npm 版本号应该符合 semver 版本号规则，建议使用 npm version 来操作。
