import React, {useEffect} from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {Modal, BackTop} from 'antd';
import 'antd/dist/antd.css';

import {ApolloProvider} from '@apollo/client';
import {useApollo} from '@src/lib/apollo';
import {getCookie} from '@src/lib/utils';

function PickkAdminApp({Component, pageProps}: AppProps) {
  const apolloClient = useApollo(pageProps);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== '/login') {
      const token = getCookie('accessToken');

      if (!token) {
        Modal.warning({
          title: '로그인이 필요한 서비스입니다.',
          onOk: () => router.replace('/login'),
        });
      }
    }
  }, []);

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
