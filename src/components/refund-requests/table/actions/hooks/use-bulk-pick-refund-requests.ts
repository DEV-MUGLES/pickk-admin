import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationBulkPickMeSellerRefundRequestsArgs,
} from '@pickk/common';

// 수거완료
export const useBulkPickRefundRequests = () => {
  const [_bulkPickRefundRequests] = useMutation<
    Pick<Mutation, 'bulkPickMeSellerRefundRequests'>,
    MutationBulkPickMeSellerRefundRequestsArgs
  >(gql`
    mutation BulkPickMeSellerRefundRequests($merchantUids: [String!]!) {
      bulkPickMeSellerRefundRequests(merchantUids: $merchantUids)
    }
  `);

  const bulkPickRefundRequests = async (merchantUids: string[]) => {
    await _bulkPickRefundRequests({
      variables: {
        merchantUids,
      },
    });
  };

  return {bulkPickRefundRequests};
};
