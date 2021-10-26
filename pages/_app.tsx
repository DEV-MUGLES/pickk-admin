import React from 'react';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {ApolloProvider} from '@apollo/client';
import {BackTop} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ko';
import 'antd/dist/antd.css';

import MainLayout from '@src/components/common/templates/MainLayout';

import {GlobalStyle} from '@src/common/styles';
import {useApolloClient} from '@src/providers/apollo';

dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.locale('ko');

function PickkAdminApp({Component, pageProps}: AppProps) {
  const apolloClient = useApolloClient(pageProps);
  const router = useRouter();

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>핔 스토어 어드민</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyle />
      {router.pathname === '/login' || router.pathname === '/cheat-login' ? (
        <Component {...pageProps} />
      ) : (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
      <BackTop />
    </ApolloProvider>
  );
}

export default PickkAdminApp;
