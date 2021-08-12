import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationBulkPickMeSellerRefundRequestsArgs,
} from '@pickk/common';
import {message} from 'antd';

// 수거완료
export const useBulkPickMeSellerRefundRequests = () => {
  const [_bulkPickMeSellerRefundRequests] = useMutation<
    Pick<Mutation, 'bulkPickMeSellerRefundRequests'>,
    MutationBulkPickMeSellerRefundRequestsArgs
  >(gql`
    mutation BulkPickMeSellerRefundRequests($ids: [Int!]!) {
      bulkPickMeSellerRefundRequests(ids: $ids)
    }
  `);

  const bulkPickMeSellerRefundRequests = async (ids: number[]) => {
    try {
      await _bulkPickMeSellerRefundRequests({
        variables: {
          ids,
        },
      });
      message.error('수거 완료되었습니다.');
    } catch (error) {
      message.error(`실패했습니다. - ${error}`);
    }
  };

  return {bulkPickMeSellerRefundRequests};
};
