import React from 'react';
import DocumentTitle from 'react-document-title';
import Layout from './Layout';

export default (props) => {
  return (
    <DocumentTitle title="Not Found | BiSheng Theme One">
      <Layout {...props}>
        <h1 className="entry-title">404 Not Found!</h1>
      </Layout>
    </DocumentTitle>
  );
}
