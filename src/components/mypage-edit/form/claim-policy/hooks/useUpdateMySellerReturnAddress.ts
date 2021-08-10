import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateMySellerReturnAddressArgs} from '@pickk/common';

import {SELLER_RETURN_ADDRESS_FRAGMENT} from './useClaimPolicyForm';

export const useUpdateMySellerReturnAddress = () =>
  useMutation<
    Pick<Mutation, 'updateMySellerReturnAddress'>,
    MutationUpdateMySellerReturnAddressArgs
  >(gql`
    mutation UpdateMySellerReturnAddress(
      $updateSellerReturnAddressInput: UpdateSellerReturnAddressInput!
    ) {
      updateMySellerReturnAddress(
        updateSellerReturnAddressInput: $updateSellerReturnAddressInput
      ) {
        ...SellerReturnAddressFragment
      }
    }
    ${SELLER_RETURN_ADDRESS_FRAGMENT}
  `);
