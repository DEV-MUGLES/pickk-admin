import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationShipMeSellerOrderItemArgs,
  ShipOrderItemInput,
} from '@pickk/common';

import {BASE_ORDER_ITEM_FRAGMENT} from '@src/common/graphql';
import {message} from 'antd';

// 발송처리
export const useShipMeSellerOrderItem = () => {
  const [_shipMeSellerOrderItems] = useMutation<
    Pick<Mutation, 'shipMeSellerOrderItem'>,
    MutationShipMeSellerOrderItemArgs
  >(gql`
    mutation ShipMeSellerOrderItems(
      $merchantUid: String!
      $shipOrderItemInput: ShipOrderItemInput!
    ) {
      shipMeSellerOrderItems(
        merchantUid: $merchantUid
        shipOrderItemInput: $shipOrderItemInput
      ) {
        ...BaseOrderItemFragment
      }
    }
    ${BASE_ORDER_ITEM_FRAGMENT}
  `);

  const shipMeSellerOrderItems = async (
    merchantUid: string,
    shipOrderItemInput: ShipOrderItemInput,
  ) => {
    try {
      await _shipMeSellerOrderItems({
        variables: {
          merchantUid,
          shipOrderItemInput,
        },
      });

      message.success('적용되었습니다.');
    } catch (error) {
      message.success(`실패했습니다. - ${error}`);
    }
  };

  return {shipMeSellerOrderItems};
};
