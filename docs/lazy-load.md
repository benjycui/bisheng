# Lazy Load

While [`lazyLoad`](https://github.com/benjycui/bisheng#lazyload-boolean--nodepath-nodevalue--boolean) is `true` or a function, Markdown data will be load lazily. And the corresponding fields in [Markdown data tree](https://github.com/benjycui/bisheng#source-string--arraystring--object-category-string--arraystring) will become a **lazy load function**, for example:

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

We can use this function to get the real Markdown data:

```js
data.posts.a()
  .then((markdownData) => {
    console.log(markdownData);
  });
```

## `collect` decorator in Template

It's inconvenient to use lazy load function directly, because we want to make sure that:
* The progress bar works correctly.
* The page will be refreshed only when the Markdown data is loaded.

So, we can add a collect function to template:

```js
// theme/template/Template.jsx
import collect from 'bisheng/collect';

const Post = (props) => {
  ...
};

export default collect(async (nextProps) => {
  if (!nextProps.pageData) {
    throw 404; // Then, bisheng will show `NotFound.jsx`
  }
  const pageData = await nextProps.pageData();
  return { pageData }; // This value will be merged with `nextProps` and passed to your route component.
})
```

`nextProps` is the original props that template will get, and we can convert lazy load function in `nextProps` to real Markdown data. Then, we return the Markdown data to notifiy `bisheng` to refresh the page with new props.

### collect(collector: async function) => (RouteComponent: React.Component) => React.Component

`collect` decorator is optional, but we can use it to improve user experience, for `bisheng` will make progress bar work correctly and refresh page at the right timing.

### collector(nextProps: Object) => Object

The returned value of `collector` will be merged with `nextProps` and passed to your `RouteComponent`. If you throw `404` in `collector`, bisheng will show `NotFound.jsx`.

## lazyLoad: (nodePath: String, nodeValue: Object) => boolean

`lazyLoad: true` will make each Markdown data as a file to load lazily. But if we want to merge several Markdown data into one file to load lazily(which will reduce HTTP request), we can pass a function to `lazyload` to do this.

`bisheng` will traverse every node of the Markdown data tree, and pass node's path and value to `lazyLoad`. If the returned value of `lazyLoad` is `true`, the whole subtree of the node will be merge in one file and the corresponding field will becoome a lazy load function. If the return value is `false`, `bisheng` will keep traversing the subtree of this node.
