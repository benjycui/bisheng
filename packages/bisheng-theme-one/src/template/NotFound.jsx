import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from './Layout';

export default (props) => {
  return (
    <Helmet>
      <title>Not Found | BiSheng Theme One</title>
      <Layout {...props}>
        <h1 className="entry-title">404 Not Found!</h1>
      </Layout>
    </Helmet>
  );
}
