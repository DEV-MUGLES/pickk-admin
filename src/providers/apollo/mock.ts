import {gql} from '@apollo/client';

const typePolicies = {
  Item: {
    fields: {
      reviewCount: {
        read() {
          return 132;
        },
      },
      purchasedCount: {
        read() {
          return 243;
        },
      },
    },
  },
};

const typeDefs = gql`
  extend type Item {
    reviewCount: Int
    purchasedCount: Int
  }
`;

export const Mock = {
  typePolicies,
  typeDefs,
};
