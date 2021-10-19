import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationShipMeSellerOrderItemArgs} from '@pickk/common';

// 발송처리
export const useShipOrderItem = () => {
  const [_shipOrderItem] = useMutation<
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

  const shipOrderItem = async (
    merchantUid: string,
    courierId: number,
    trackCode: string,
  ) => {
    await _shipOrderItem({
      variables: {
        merchantUid,
        shipOrderItemInput: {
          courierId,
          trackCode,
        },
      },
    });
  };

  return {shipOrderItem};
};
