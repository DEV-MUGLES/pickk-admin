import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationCancelMeSellerOrderItemArgs} from '@pickk/common';

// 주문 취소
export const useCancelMeSellerOrderItem = () => {
  const [_cancelMeSellerOrderItem] = useMutation<
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

  const cancelMeSellerOrderItem = async (
    merchantUid: string,
    restock: boolean,
  ) => {
    await _cancelMeSellerOrderItem({
      variables: {
        merchantUid,
        restock,
      },
    });
  };

  return {cancelMeSellerOrderItem};
};
