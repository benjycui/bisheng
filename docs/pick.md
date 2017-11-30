# pick

有时候我们需要获取大量的 markdown 数据，但我们只需要它们的一部分，比如归档页面。由于获取大量数据会导致性能问题，我们可以使用 `pick` 提升性能。

`pick` 字段的属性值均为函数，其签名如下：

```js
function(markdownData: Object): any | undefined
```

`eocky` 会用 `pick` 来处理 markdown 数据，当这些函数的返回值不为空时，`eocky` 就会将这些数据传入 `route.config.picked`，例如：

```js
pick: {
  titles(markdownData) { return markdownData.meta.title },
},
```

然后，得到 `picked` 字段如下：

```js
{
  titles: [...],
}
```
