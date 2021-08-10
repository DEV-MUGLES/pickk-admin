import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateMySellerSettlePolicyArgs} from '@pickk/common';

import {SELLER_SETTLE_POLICY_FRAGMENT} from '@src/common/graphql';

export const useUpdateMySellerSettlePolicy = () =>
  useMutation<
    Pick<Mutation, 'updateMySellerSettlePolicy'>,
    MutationUpdateMySellerSettlePolicyArgs
  >(gql`
    mutation UpdateMySellerSettlePolicy(
      $updateSellerSettlePolicyInput: UpdateSellerSettlePolicyInput!
    ) {
      updateMySellerSettlePolicy(
        updateSellerSettlePolicyInput: $updateSellerSettlePolicyInput
      ) {
        ...SellerSettlePolicyFragment
      }
    }
    ${SELLER_SETTLE_POLICY_FRAGMENT}
  `);
