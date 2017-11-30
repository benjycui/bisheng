# 懒加载

当主题配置中的 `lazyload` 是 `true` 或者一个函数的时候，markdown 数据将使用懒加载，暴露给前端的 markdown 树形数据将变成**懒加载函数**，下面是一个例子：

```js
// lazyLoad: false
{
  posts: {
    a: {...},
  },
}

// lazyLoad: true
{
  posts: {
    a: function() {...},
  },
}
```

使用下面这种方式拿到数据：

```js
data.posts.a()
  .then((markdownData) => {
    console.log(markdownData);
  });
```

## lazyLoad: (nodePath: String, nodeValue: Object) => boolean

`lazyLoad: true` 会让文件的 markdown 数据使用懒加载。而当我们希望不要每个文件都懒加载的时候（减少 HTTP 请求），可以给这个字段传入一个函数来做这件事。

`eocky` 会遍历 markdown 树形数据结构的所有节点，传入节点的 path 和 value 到 `lazyload` 函数，如果它返回 `true`，整棵子树的数据会合并成一个函数（调用返回 Promise）。如果返回 `false`，则继续遍历子树的各节点。
