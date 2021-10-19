import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationBulkPickMeSellerExchangeRequestsArgs,
} from '@pickk/common';

const BULK_PICK_EXCHANGE_REQUESTS = gql`
  mutation BulkPickMeSellerExchangeRequests($merchantUids: [String!]!) {
    bulkPickMeSellerExchangeRequests(merchantUids: $merchantUids)
  }
`;

export const useBulkPickExchangeRequests = () => {
  const [_bulkPickExchangeRequests] = useMutation<
    Pick<Mutation, 'bulkPickMeSellerExchangeRequests'>,
    MutationBulkPickMeSellerExchangeRequestsArgs
  >(BULK_PICK_EXCHANGE_REQUESTS);

  const bulkPickExchangeRequests = async (merchantUids: string[]) => {
    await _bulkPickExchangeRequests({
      variables: {
        merchantUids,
      },
    });
  };

  return {bulkPickExchangeRequests};
};
