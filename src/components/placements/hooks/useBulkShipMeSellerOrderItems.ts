import {gql, useMutation} from '@apollo/client';
import {message} from 'antd';
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
    try {
      await _bulkShipMeSellerOrderItems({
        variables: {
          bulkShipOrderItemInput: {
            shipOrderItemInputs,
          },
        },
      });

      message.success('적용되었습니다.');
    } catch (err) {
      message.error(`실패했습니다. - ${err}`);
    }
  };

  return {bulkShipMeSellerOrderItems};
};
