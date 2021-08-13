import {gql, useMutation} from '@apollo/client';
import {message} from 'antd';
import {
  Mutation,
  MutationBulkShipReadyMeSellerOrderItemsArgs,
} from '@pickk/common';

// 발주확인
export const useBulkShipReadyMeSellerOrderItems = () => {
  const [_bulkShipReadyMeSellerOrderItems] = useMutation<
    Pick<Mutation, 'bulkShipReadyMeSellerOrderItems'>,
    MutationBulkShipReadyMeSellerOrderItemsArgs
  >(
    gql`
      mutation BulkShipReadyMeSellerOrderItems($merchantUids: [String!]!) {
        bulkShipReadyMeSellerOrderItems(merchantUids: $merchantUids)
      }
    `,
  );

  const bulkShipReadyMeSellerOrderItems = async (merchantUids: string[]) => {
    try {
      await _bulkShipReadyMeSellerOrderItems({
        variables: {
          merchantUids,
        },
      });

      message.success(`발주확인 완료되었습니다.`);
    } catch (err) {
      message.error('실패했습니다. - ' + err);
    }
  };

  return {bulkShipReadyMeSellerOrderItems};
};
