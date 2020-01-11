import React from "react";
import App from "next/app";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import cookies from "next-cookies";

import redirectTo from "@src/lib/redirect-to";
import { BackTop } from "antd";

class PickkApp extends App {
  /*
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    const c = cookies(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
    
    if (typeof c.authtoken == "undefined") {
      if (ctx.pathname == "/login" || ctx.pathname == "/forgot-password")
        return { pageProps };
      else redirectTo("/login", { res: ctx.res, status: 301 });
    } else {
      var response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: c.authtoken })
        }
      )
        .then(r => r.json())
        .then(resp => {
          if (ctx.pathname == "/") {
            if (resp.result == "success")
              redirectTo("/dashboard", { res: ctx.res, status: 301 });
            else {
              document.cookie =
                "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              redirectTo("/login", { res: ctx.res, status: 301 });
            }
          } else if (ctx.pathname == "/login") {
            if (resp.result == "success") {
              redirectTo("/dashboard", { res: ctx.res, status: 301 });
            } else
              return {
                ...pageProps,
                ...{ query: ctx.query, authtoken: c.authtoken }
              };
          } else {
            if (resp.result == "success")
              return {
                ...pageProps,
                ...{ query: ctx.query, authtoken: c.authtoken }
              };
            else {
              document.cookie =
                "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              redirectTo("/login", { res: ctx.res, status: 301 });
            }
          }
        })
        .catch(err => {
          console.log(err);
          return { pageProps };
        });
    }

    if (response !== null) {
      return { response };
    } else return { pageProps };
    
  }*/
  render() {
    const { Component, pageProps } = this.props;
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
