import React from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';

import {BackTop} from 'antd';

function PickkAdminApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>핔 스토어 어드민</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <BackTop />
    </>
  );
}

export default PickkAdminApp;
