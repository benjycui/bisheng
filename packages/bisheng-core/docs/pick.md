# pick

Sometimes, we will load lots of Markdown data, but we only need part of these Markdown data, such as the archived page. This will slow down our website, but we can use `pick` to improve the performance.

Each field in `pick` is a function, and the signature of these functions is:

```js
function(markdownData: Object): any | undefined
```

`bisheng` will pass Markdown data to each field in `pick` one by one, if those functions return something except `undefined`, `bisheng` will collect them and put them into `props.picked`, for example:

```js
pick: {
  titles(markdownData) { return markdownData.meta.title },
},
```

Then, the `props.picked` will be:

```js
{
  titles: [...],
}
```
