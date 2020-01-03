const withCSS = require("@zeit/next-css");
const withSourceMaps = require("@zeit/next-source-maps");
const withImages = require("next-images");
const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

const withLess = require("@zeit/next-less");
const themeVars = require("./antd-theme");

module.exports = withImages(
  withCSS(
    withSourceMaps(
      withLess({
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVars
        },
        webpack: (config, { isServer }) => {
          if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/;
            const origExternals = [...config.externals];
            config.externals = [
              (context, request, callback) => {
                if (request.match(antStyles)) return callback();
                if (typeof origExternals[0] === "function") {
                  origExternals[0](context, request, callback);
                } else {
                  callback();
                }
              },
              ...(typeof origExternals[0] === "function" ? [] : origExternals)
            ];

            config.module.rules.unshift({
              test: antStyles,
              use: "null-loader"
            });
          }
          config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
          return config;
        }
      })
    )
  )
);
