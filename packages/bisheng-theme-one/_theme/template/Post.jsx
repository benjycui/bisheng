import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Layout from './Layout';

function getPostFilename(pathname) {
  const snippets = pathname.split('/');
  return `${snippets[snippets.length - 1]}.md`;
}

export default (props) => {
  const { data, utils, location } = props;
  const { meta, content } = data.posts[getPostFilename(location.pathname)];
  const publishDate = new Date(meta.publishDate);
  return (
    <DocumentTitle title="Archive | BiSheng Theme One">
      <Layout {...props}>
        <div className="hentry">
          <h1 className="entry-title" itemprop="name">{meta.title}</h1>
          {
            !meta.description ? null :
              <div className="entry-description">{meta.description}</div>
          }
          <div className="entry-content">{utils.toReactComponent(content)}</div>

          <div className="entry-meta">
            <time className="updated">
              {`${publishDate.getFullYear()}-${publishDate.getMonth() + 1}-${publishDate.getDate()} `}
            </time>
            {
              !meta.tags ? null :
                <span>
                  in <span class="entry-tags">
                  {
                    meta.tags.map((tag, index) =>
                      <Link to="not-found" key={index}>{tag}</Link>
                    )
                  }
                  </span>
                </span>
            }
            {
              !meta.source ? null :
                <a className="source sep" href={meta.source}>
                  {meta.source}
                </a>
            }
          </div>
        </div>
      </Layout>
    </DocumentTitle>
  );
}

// TODO
// {%- if config.disqus %}
// {%- include "_disqus.html" %}
// {%- endif %}
// {%- if config.duoshuo %}
// {%- include "_duoshuo.html" %}
// {%- endif %}
