import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationShipMeSellerOrderItemArgs} from '@pickk/common';

// 발송처리
export const useShipMeSellerOrderItem = () => {
  const [_shipMeSellerOrderItems] = useMutation<
    Pick<Mutation, 'shipMeSellerOrderItem'>,
    MutationShipMeSellerOrderItemArgs
  >(gql`
    mutation ShipMeSellerOrderItem(
      $merchantUid: String!
      $shipOrderItemInput: ShipOrderItemInput!
    ) {
      shipMeSellerOrderItem(
        merchantUid: $merchantUid
        shipOrderItemInput: $shipOrderItemInput
      ) {
        id
      }
    }
  `);

  const shipMeSellerOrderItems = async (
    merchantUid: string,
    courierId: number,
    trackCode: string,
  ) => {
    await _shipMeSellerOrderItems({
      variables: {
        merchantUid,
        shipOrderItemInput: {
          courierId,
          trackCode,
        },
      },
    });
  };

  return {shipMeSellerOrderItems};
};
