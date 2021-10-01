import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationConfirmMeSellerRefundRequestArgs,
} from '@pickk/common';

const CONFIRM_ME_SELLER_REFUND_REQUEST = gql`
  mutation confirmMeSellerRefundRequest(
    $merchantUid: String!
    $shippingFee: Int!
  ) {
    confirmMeSellerRefundRequest(
      merchantUid: $merchantUid
      shippingFee: $shippingFee
    )
  }
`;

export const useConfirmRefundRequest = () => {
  const [confirm] = useMutation<
    Pick<Mutation, 'confirmMeSellerRefundRequest'>,
    MutationConfirmMeSellerRefundRequestArgs
  >(CONFIRM_ME_SELLER_REFUND_REQUEST);

  const confirmRefundRequest = async (
    merchantUid: string,
    shippingFee: number,
  ) => {
    await confirm({
      variables: {
        merchantUid,
        shippingFee,
      },
    });
  };

  return {confirmRefundRequest};
};
