const {parsed: localEnv} = require('dotenv').config();

module.exports = {
  productionBrowserSourceMaps: true,
  webpack(config, {isServer, webpack}) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv || process.env));
    return config;
  },
};
