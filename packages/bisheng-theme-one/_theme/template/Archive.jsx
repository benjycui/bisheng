import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Layout from './Layout';

function getTime(date) {
  return (new Date(date)).getTime();
}

export default (props) => {
  const data = props.data;
  const posts = Object.keys(data.posts).map((key) => data.posts[key])
          .sort((a, b) => getTime(b.meta.publishDate) - getTime(a.meta.publishDate));

  let year = 0;
  const entryList = [];
  posts.forEach(({ meta }, index) => {
    const publishDate = new Date(meta.publishDate);
    if (year !== publishDate.getFullYear()) {
      year = publishDate.getFullYear();
      entryList.push(<Link className="item-year" to={`#${year}`} key={year} id={year}>{year}</Link>);
    }

    entryList.push(
      <div className="item" key={index}>
        <h2 className="item-title" id={meta.title}>
          <time>{`${year}-${publishDate.getMonth() + 1}-${publishDate.getDate()} `}</time>
          <Link to={`${meta.filename.replace(/\.md$/i, '')}`}>{meta.title}</Link>
        </h2>
        {
          !meta.description ? null :
            <div class="item-description">
              { meta.description }
            </div>
        }
      </div>
    );
  })
  return (
    <DocumentTitle title="Archive | BiSheng Theme One">
      <Layout {...props}>
        <h1 className="entry-title">Archive</h1>
        <div class="entry-list">
          {entryList}
        </div>
      </Layout>
    </DocumentTitle>
  );
}

// TODO
// <div class="pagination">
//   {%- if pagination.has_prev %}
//   <a class="newer" href="{{ pagination_url(pagination.prev_num) }}">Newer</a>
//   {%- endif %}

//   {%- if pagination.has_next %}
//   <a class="older" href="{{ pagination_url(pagination.next_num) }}">Older</a>
//   {%- endif %}
// </div>
