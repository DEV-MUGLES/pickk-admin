import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationBulkPickMeSellerExchangeRequestsArgs,
} from '@pickk/common';
import {message} from 'antd';

export const useBulkPickMeSellerExchangeRequests = () => {
  const [_bulkPickMeSellerExchangeRequests] = useMutation<
    Pick<Mutation, 'bulkPickMeSellerExchangeRequests'>,
    MutationBulkPickMeSellerExchangeRequestsArgs
  >(gql`
    mutation BulkPickMeSellerExchangeRequests($id: [Int!]!) {
      bulkPickMeSellerExchangeRequests(id: $id)
    }
  `);

  const bulkPickMeSellerExchangeRequests = async (ids: number[]) => {
    try {
      await _bulkPickMeSellerExchangeRequests({
        variables: {
          ids,
        },
      });
      message.success('수거 완료되었습니다.');
    } catch (error) {
      message.error(`실패했습니다. - ${error}`);
    }
  };

  return {bulkPickMeSellerExchangeRequests};
};
