import React from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';

import {BackTop} from 'antd';
import 'antd/dist/antd.css';

import {ApolloProvider} from '@apollo/client';
import {useApollo} from '@src/lib/apollo';

function PickkAdminApp({Component, pageProps}: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>핔 스토어 어드민</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <BackTop />
    </ApolloProvider>
  );
}

export default PickkAdminApp;
