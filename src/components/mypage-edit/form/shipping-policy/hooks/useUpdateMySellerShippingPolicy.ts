import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationUpdateMySellerShippingPolicyArgs,
} from '@pickk/common';

export const useUpdateMySellerShippingPolicy = () => {
  const [update] = useMutation<
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

  const updateMySellerShippingPolicy = async (
    fee: number,
    minimumAmountForFree: number,
    description: string,
  ) => {
    await update({
      variables: {
        updateSellerShippingPolicyInput: {
          fee,
          minimumAmountForFree,
          description,
        },
      },
    });
  };

  return {updateMySellerShippingPolicy};
};
