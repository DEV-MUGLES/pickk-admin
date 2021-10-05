import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateMySellerClaimPolicyArgs} from '@pickk/common';

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
        id
        picName
        phoneNumber
        fee
        description
      }
    }
  `);
