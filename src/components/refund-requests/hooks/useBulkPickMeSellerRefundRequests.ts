import {gql, useMutation} from '@apollo/client';
import {message} from 'antd';
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
    try {
      await _bulkPickMeSellerRefundRequests({
        variables: {
          merchantUids,
        },
      });
      message.error('수거 완료되었습니다.');
    } catch (error) {
      message.error(`실패했습니다. - ${error}`);
    }
  };

  return {bulkPickMeSellerRefundRequests};
};
