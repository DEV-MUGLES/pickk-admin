import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationUpdateMySellerShippingPolicyArgs,
} from '@pickk/common';

export const useUpdateMySellerShippingPolicy = () =>
  useMutation<
    Pick<Mutation, 'updateMySellerShippingPolicy'>,
    MutationUpdateMySellerShippingPolicyArgs
  >(gql`
    mutation UpdateMySellerShippingPolicy(
      $updateSellerShippingPolicyInput: UpdateSellerShippingPolicyInput!
    ) {
      updateMySellerShippingPolicy(
        updateSellerShippingPolicyInput: $updateSellerShippingPolicyInput
      ) {
        id
        fee
        minimumAmountForFree
        description
      }
    }
  `);
