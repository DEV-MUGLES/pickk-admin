import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateMySellerSettlePolicyArgs} from '@pickk/common';

const UPDATE_SELLER_SETTLE_POLICY = gql`
  mutation UpdateMySellerSettlePolicy(
    $updateSellerSettlePolicyInput: UpdateSellerSettlePolicyInput!
  ) {
    updateMySellerSettlePolicy(
      updateSellerSettlePolicyInput: $updateSellerSettlePolicyInput
    ) {
      id
      picName
      phoneNumber
      email
    }
  }
`;

export const useUpdateMySellerSettlePolicy = () =>
  useMutation<
    Pick<Mutation, 'updateMySellerSettlePolicy'>,
    MutationUpdateMySellerSettlePolicyArgs
  >(UPDATE_SELLER_SETTLE_POLICY);
