import {gql, useMutation} from '@apollo/client';
import {
  CancelMeSellerOrderItemInput,
  Mutation,
  MutationCancelMeSellerOrderItemArgs,
} from '@pickk/common';
import {message} from 'antd';

// 주문 취소
export const useCancelMeSellerOrderItem = () => {
  const [_cancelMeSellerOrderItem] = useMutation<
    Pick<Mutation, 'cancelMeSellerOrderItem'>,
    MutationCancelMeSellerOrderItemArgs
  >(gql`
    mutation CancelMeSellerOrderItem(
      $merchantUid: String!
      $cancelMeSellerOrderItemInput: CancelMeSellerOrderItemInput!
    ) {
      cancelMeSellerOrderItem(
        merchantUid: $merchantUid
        cancelMeSellerOrderItemInput: $cancelMeSellerOrderItemInput
      ) {
        id
      }
    }
  `);

  const cancelMeSellerOrderItem = async (
    merchantUid: string,
    cancelMeSellerOrderItemInput: CancelMeSellerOrderItemInput,
  ) => {
    try {
      await _cancelMeSellerOrderItem({
        variables: {
          merchantUid,
          cancelMeSellerOrderItemInput,
        },
      });

      message.success(`취소 완료되었습니다.`);
    } catch (error) {
      message.error('실패했습니다. - ' + error);
    }
  };

  return {cancelMeSellerOrderItem};
};
