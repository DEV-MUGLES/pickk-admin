import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import cookies from 'next-cookies';

import redirectTo from '@src/lib/redirect-to';
import {BackTop} from 'antd';

class PickkApp extends App {
  static async getInitialProps({Component, router, ctx}) {
    let pageProps = {};
    const c = cookies(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (typeof c.authtoken == 'undefined') {
      if (ctx.pathname == '/login' || ctx.pathname == '/forgot-password')
        return {pageProps};
      else redirectTo('/login', {res: ctx.res, status: 301});
    } else {
      var response = await fetch(
        process.env.API_HOST + '/partner/token/verify/',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({token: c.authtoken}),
        },
      )
        .then(r => r.status)
        .then(status => {
          if (ctx.pathname == '/') {
            if (status === 200)
              redirectTo('/items', {res: ctx.res, status: 301});
            else {
              document.cookie =
                'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              redirectTo('/login', {res: ctx.res, status: 301});
            }
          } else if (ctx.pathname == '/login') {
            if (status === 200) {
              redirectTo('/items', {res: ctx.res, status: 301});
            } else
              return {
                ...pageProps,
                ...{query: ctx.query, authtoken: c.authtoken},
              };
          } else {
            if (status === 200)
              return {
                ...pageProps,
                ...{query: ctx.query, authtoken: c.authtoken},
              };
            else {
              document.cookie =
                'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              redirectTo('/login', {res: ctx.res, status: 301});
            }
          }
        })
        .catch(err => {
          console.log(err);
          return {pageProps};
        });
    }

    if (response !== null) {
      return {response};
    } else return {pageProps};
  }
  render() {
    const {Component, pageProps} = this.props;
    return (
      <>
        <Head>
          <title>핔 스토어 어드민</title>
        </Head>
        <Component {...pageProps} />
        <BackTop />
      </>
    );
  }
}

export default PickkApp;
