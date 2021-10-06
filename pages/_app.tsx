import React from 'react';
import App, {AppContext, AppProps} from 'next/app';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {ApolloProvider, gql} from '@apollo/client';
import {BackTop} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ko';
import 'antd/dist/antd.css';
import {UserRole} from '@pickk/common';

import MainLayout from '@src/components/common/templates/MainLayout';

import {GlobalStyle} from '@src/common/styles';
import {createApolloClient, useApolloClient} from '@src/providers/apollo';

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
      {router.pathname === '/login' ? (
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

PickkAdminApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  if (appContext.ctx.pathname === '/login') {
    return appProps;
  }

  try {
    const client = createApolloClient(appContext.ctx.req);
    const {
      data: {me},
    } = await client.query<{me: {role: UserRole}}>({
      query: GET_ME,
    });

    if (!me || (me.role !== UserRole.Seller && me.role !== UserRole.Admin)) {
      throw new Error('권한 없음');
    }

    return {...appProps, pageProps: {...appProps.pageProps, me}};
  } catch {
    const {ctx} = appContext;

    if (ctx.res) {
      ctx.res.writeHead(302, {Location: `/login?to=${ctx.pathname}`});
      ctx.res.end();
    }
  }
};

const GET_ME = gql`
  query me {
    me {
      id
      nickname
      role
    }
  }
`;
