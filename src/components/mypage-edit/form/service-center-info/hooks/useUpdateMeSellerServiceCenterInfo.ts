import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateMeSellerArgs} from '@pickk/common';

const UPDATE_ME_SELLER = gql`
  mutation UpdateMeSeller($updateSellerInput: UpdateSellerInput!) {
    updateMeSeller(updateSellerInput: $updateSellerInput) {
      id
      phoneNumber
      operationTimeMessage
      kakaoTalkCode
    }
  }
`;

export const useUpdateMeSellerServiceCenterInfo = () =>
  useMutation<Pick<Mutation, 'updateMeSeller'>, MutationUpdateMeSellerArgs>(
    UPDATE_ME_SELLER,
  );
