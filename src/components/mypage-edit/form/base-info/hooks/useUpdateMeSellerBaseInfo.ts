import {gql, useMutation} from '@apollo/client';
import {MutationUpdateMeSellerArgs} from '@pickk/common';

import {
  SELLER_BASE_INFO_FRAGMENT,
  MeSellerBaseInfoData,
} from './useMeSellerBaseInfo';

export const useUpdateMeSellerBaseInfo = () =>
  useMutation<
    {updateMeSeller: MeSellerBaseInfoData},
    MutationUpdateMeSellerArgs
  >(
    gql`
      mutation UpdateMeSeller($updateSellerInput: UpdateSellerInput!) {
        updateMeSeller(updateSellerInput: $updateSellerInput) {
          ...SellerBaseInfoFragment
        }
      }
      ${SELLER_BASE_INFO_FRAGMENT}
    `,
  );
