import {gql, useMutation} from '@apollo/client';
import {
  ExtendedShipOrderItemInput,
  Mutation,
  MutationBulkShipMeSellerOrderItemsArgs,
} from '@pickk/common';

// 일괄발송 (엑셀, csv)
export const useBulkShipMeSellerOrderItems = () => {
  const [_bulkShipMeSellerOrderItems] = useMutation<
    Pick<Mutation, 'bulkShipMeSellerOrderItems'>,
    MutationBulkShipMeSellerOrderItemsArgs
  >(
    gql`
      mutation BulkShipMeSellerOrderItems(
        $bulkShipOrderItemInput: BulkShipOrderItemInput!
      ) {
        bulkShipMeSellerOrderItems(
          bulkShipOrderItemInput: $bulkShipOrderItemInput
        )
      }
    `,
  );

  const bulkShipMeSellerOrderItems = async (
    shipOrderItemInputs: Array<ExtendedShipOrderItemInput>,
  ) => {
    await _bulkShipMeSellerOrderItems({
      variables: {
        bulkShipOrderItemInput: {
          shipOrderItemInputs,
        },
      },
    });
  };

  return {bulkShipMeSellerOrderItems};
};
