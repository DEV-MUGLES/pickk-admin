import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateMeSellerArgs} from '@pickk/common';

import {SELLER_SERVICE_CENTER_INFO_FRAGEMENT} from '@src/common/graphql';

export const useUpdateMeSellerServiceCenterInfo = () =>
  useMutation<Pick<Mutation, 'updateMeSeller'>, MutationUpdateMeSellerArgs>(gql`
    mutation UpdateMeSeller($updateSellerInput: UpdateSellerInput!) {
      updateMeSeller(updateSellerInput: $updateSellerInput) {
        ...SellerServiceCenterInfoFragment
      }
    }
    ${SELLER_SERVICE_CENTER_INFO_FRAGEMENT}
  `);
