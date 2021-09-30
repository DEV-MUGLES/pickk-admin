import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationBulkPickMeSellerRefundRequestsArgs,
} from '@pickk/common';

// 수거완료
export const useBulkPickMeSellerRefundRequests = () => {
  const [_bulkPickMeSellerRefundRequests] = useMutation<
    Pick<Mutation, 'bulkPickMeSellerRefundRequests'>,
    MutationBulkPickMeSellerRefundRequestsArgs
  >(gql`
    mutation BulkPickMeSellerRefundRequests($merchantUids: [String!]!) {
      bulkPickMeSellerRefundRequests(merchantUids: $merchantUids)
    }
  `);

  const bulkPickMeSellerRefundRequests = async (merchantUids: string[]) => {
    await _bulkPickMeSellerRefundRequests({
      variables: {
        merchantUids,
      },
    });
  };

  return {bulkPickMeSellerRefundRequests};
};
