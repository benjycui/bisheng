import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Layout from './Layout';

export default (props) => {
  const posts = props.data.posts;
  const tags = {};
  Object.keys(posts).forEach((post) => {
    const postTags = posts[post].meta.tags;
    if (postTags) {
      postTags.forEach((tag) => {
        if (tags[tag]) {
          tags[tag].push(posts[post]);
        } else {
          tags[tag] = [posts[post]];
        }
      });
    }
  });
  
  return (
    <DocumentTitle title="Tag Cloud">
      <Layout {...props}>
        <h1 className="entry-title">Tags</h1>
        <div className="tagcloud">
          {
            Object.keys(tags)
              .map((tag, index) => <a href={`#${tag}`} key={index}>{tag} <span className="count">{tags[tag].length}</span></a>)
          }
        </div>

        <div className="entry-list">
          {
            Object.keys(tags).map((tag) => {
              return ([
                <a className="item-tag" href={`#${tag}`} id={tag} key="tag">{tag}</a>
              ].concat(tags[tag].map(({ meta }, index) => 
                <div className="item" key={index}>
                  <h2 className="item-title">
                    <time>{meta.publishDate.slice(0, 10)}</time>
                    <Link to={`${meta.filename.replace(/\.md/, '')}`}>{meta.title}</Link>
                  </h2>
                  {
                    !meta.description ? null :
                      <div className="item-description">
                        { meta.description }
                      </div>
                  }
                </div>
              )));
            })
          }
        </div>
      </Layout>
    </DocumentTitle>
  );
}
