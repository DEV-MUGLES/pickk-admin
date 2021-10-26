import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationBulkShipReadyMeSellerOrderItemsArgs,
} from '@pickk/common';

// 발주확인
export const useBulkShipReadyOrderItems = () => {
  const [_bulkShipReadyOrderItems] = useMutation<
    Pick<Mutation, 'bulkShipReadyMeSellerOrderItems'>,
    MutationBulkShipReadyMeSellerOrderItemsArgs
  >(
    gql`
      mutation BulkShipReadyMeSellerOrderItems($merchantUids: [String!]!) {
        bulkShipReadyMeSellerOrderItems(merchantUids: $merchantUids)
      }
    `,
  );

  const bulkShipReadyOrderItems = async (merchantUids: string[]) => {
    await _bulkShipReadyOrderItems({
      variables: {
        merchantUids,
      },
    });
  };

  return {bulkShipReadyOrderItems};
};
