import React from 'react';
import { Link } from 'bisheng/router';
import DocumentTitle from 'react-document-title';
import Layout from './Layout';

function getTags(posts) {
  const tags = {};
  Object.keys(posts).forEach((filename) => {
    const post = posts[filename];
    const postTags = post.meta.tags;
    if (postTags) {
      postTags.forEach((tag) => {
        if (tags[tag]) {
          tags[tag].push(post);
        } else {
          tags[tag] = [post];
        }
      });
    }
  });
  return tags;
}

export default (props) => {
  const toReactComponent = props.utils.toReactComponent;
  const tags = getTags(props.picked.posts);

  return (
    <DocumentTitle title="Tag Cloud | BiSheng Theme One">
      <Layout {...props}>
        <h1 className="entry-title">Tags</h1>
        <div className="tagcloud">
          {
            Object.keys(tags).map(
              (tag, index) =>
                <a href={`#${tag}`} key={index}>
                  {tag} <span className="count">{tags[tag].length}</span>
                </a>
            )
          }
        </div>

        <div className="entry-list">
          {
            Object.keys(tags).map((tag) =>
              [
                <a className="item-tag" href={`#${tag}`} id={tag} key="tag">{tag}</a>
              ].concat(tags[tag].map(({ meta, description }, index) =>
                <div className="item" key={index}>
                  <h2 className="item-title">
                    <time>{meta.publishDate.slice(0, 10)}</time>
                    <Link to={`${meta.filename.replace(/\.md/, '')}`}>{meta.title}</Link>
                  </h2>
                  {
                    !description ? null :
                      <div className="item-description">
                        { toReactComponent(description) }
                      </div>
                  }
                </div>
              ))
            )
          }
        </div>
      </Layout>
    </DocumentTitle>
  );
}
