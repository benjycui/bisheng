import Promise from 'bluebird';

export function collect(nextProps, callback) {
  const data = nextProps.data;
  Promise.all(Object.keys(data.posts).map((key) => data.posts[key]()))
    .then((posts) => {
      callback(null, {
        ...nextProps,
        posts,
      })
    })
}