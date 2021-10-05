import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationBulkPickMeSellerExchangeRequestsArgs,
} from '@pickk/common';

export const useBulkPickMeSellerExchangeRequests = () => {
  const [_bulkPickMeSellerExchangeRequests] = useMutation<
    Pick<Mutation, 'bulkPickMeSellerExchangeRequests'>,
    MutationBulkPickMeSellerExchangeRequestsArgs
  >(gql`
    mutation BulkPickMeSellerExchangeRequests($merchantUids: [String!]!) {
      bulkPickMeSellerExchangeRequests(merchantUids: $merchantUids)
    }
  `);

  const bulkPickMeSellerExchangeRequests = async (merchantUids: string[]) => {
    await _bulkPickMeSellerExchangeRequests({
      variables: {
        merchantUids,
      },
    });
  };

  return {bulkPickMeSellerExchangeRequests};
};
