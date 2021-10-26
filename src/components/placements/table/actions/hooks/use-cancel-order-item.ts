import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationCancelMeSellerOrderItemArgs} from '@pickk/common';

// 주문 취소
export const useCancelOrderItem = () => {
  const [_cancelOrderItem] = useMutation<
    Pick<Mutation, 'cancelMeSellerOrderItem'>,
    MutationCancelMeSellerOrderItemArgs
  >(gql`
    mutation CancelMeSellerOrderItem(
      $merchantUid: String!
      $restock: Boolean!
    ) {
      cancelMeSellerOrderItem(merchantUid: $merchantUid, restock: $restock) {
        merchantUid
      }
    }
  `);

  const cancelOrderItem = async (merchantUid: string, restock: boolean) => {
    await _cancelOrderItem({
      variables: {
        merchantUid,
        restock,
      },
    });
  };

  return {cancelOrderItem};
};
