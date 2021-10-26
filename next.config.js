module.exports = {
  mode: 'production',
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/sellable-items',
      },
    ];
  },
};
