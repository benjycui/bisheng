import React from 'react';
import { Link } from 'bisheng/router';
import DocumentTitle from 'react-document-title';
import Layout from './Layout';

function getTime(date) {
  return (new Date(date)).getTime();
}

export default (props) => {
  const toReactComponent = props.utils.toReactComponent;
  const posts = props.picked.posts
          .sort((a, b) => getTime(b.meta.publishDate) - getTime(a.meta.publishDate));

  let year = NaN;
  const entryList = [];
  posts.forEach(({ meta, description }, index) => {
    const publishYear = meta.publishDate.slice(0, 4);
    if (year !== publishYear) {
      year = publishYear;
      entryList.push(
        <a className="item-year" href={`#${publishYear}`} key={publishYear} id={publishYear}>
          {publishYear}
        </a>);
    }

    entryList.push(
      <div className="item" key={index}>
        <h2 className="item-title" id={meta.title}>
          <time>{`${meta.publishDate.slice(0, 10)} `}</time>
          <Link to={`/${meta.filename.replace(/\.md$/i, '')}`}>{meta.title}</Link>
        </h2>
        {
          !description ? null :
            <div className="item-description">
              { toReactComponent(description) }
            </div>
        }
      </div>
    );
  })
  return (
    <DocumentTitle title="BiSheng Theme One">
      <Layout {...props}>
        <h1 className="entry-title">Archive</h1>
        <div className="entry-list">
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
