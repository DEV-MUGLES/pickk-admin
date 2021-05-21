module.exports = {
  client: {
    includes: ['./src/operations/**/*.ts'],
    tagName: 'gql',
    service: {
      name: 'pickk-server',
      url: 'https://api.pickk.dev/graphql',
    },
  },
};
