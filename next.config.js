const {parsed: localEnv} = require('dotenv').config();

module.exports = {
  mode: 'production',
  productionBrowserSourceMaps: true,
  webpack(config, {isServer, webpack}) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv || process.env));
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/sellable-items',
      },
    ];
  },
};
