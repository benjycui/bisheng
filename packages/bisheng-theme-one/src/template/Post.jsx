import React from 'react';
import { Link } from 'bisheng/router';
import collect from 'bisheng/collect';
import DocumentTitle from 'react-document-title';
import Layout from './Layout';

const Post = (props) => {
  const { pageData, utils } = props;
  const { meta, description, content } = pageData;
  return (
    <DocumentTitle title={`${meta.title} | BiSheng Theme One`}>
      <Layout {...props}>
        <div className="hentry">
          <h1 className="entry-title">{meta.title}</h1>
          {
            !description ? null :
              <div className="entry-description">{utils.toReactComponent(description)}</div>
          }
          <div className="entry-content">{utils.toReactComponent(content)}</div>

          <div className="entry-meta">
            <time className="updated">
              {`${meta.publishDate.slice(0, 10)} `}
            </time>
            {
              !meta.tags ? null :
                <span>
                  in <span className="entry-tags">
                  {
                    meta.tags.map((tag, index) =>
                      <Link to={`/tags#${tag}`} key={index}>{tag}</Link>
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

export default collect(async (nextProps) => {
  if (!nextProps.pageData) {
    throw 404;
  }
  const pageData = await nextProps.pageData();
  return { pageData };
})(Post);

// TODO
// {%- if config.disqus %}
// {%- include "_disqus.html" %}
// {%- endif %}
// {%- if config.duoshuo %}
// {%- include "_duoshuo.html" %}
// {%- endif %}
