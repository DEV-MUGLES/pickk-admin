import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateMySellerClaimPolicyArgs} from '@pickk/common';

import {SELLER_CLAIM_POLICY_FRAGMENT} from './seller';

export const useUpdateMySellerClaimPolicy = () =>
  useMutation<
    Pick<Mutation, 'updateMySellerClaimPolicy'>,
    MutationUpdateMySellerClaimPolicyArgs
  >(gql`
    mutation UpdateMySellerClaimPolicy(
      $updateSellerClaimPolicyInput: UpdateSellerClaimPolicyInput!
    ) {
      updateMySellerClaimPolicy(
        updateSellerClaimPolicyInput: $updateSellerClaimPolicyInput
      ) {
        ...SellerClaimPolicyFragment
      }
    }
    ${SELLER_CLAIM_POLICY_FRAGMENT}
  `);
