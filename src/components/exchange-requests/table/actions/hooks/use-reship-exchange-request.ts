import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationReshipMeSellerExchangeRequestArgs,
  ReshipExchangeRequestInput,
} from '@pickk/common';

// 재발송처리
export const useReshipExchangeRequest = () => {
  const [_reshipExchangeRequest] = useMutation<
    Pick<Mutation, 'reshipMeSellerExchangeRequest'>,
    MutationReshipMeSellerExchangeRequestArgs
  >(gql`
    mutation ReshipMeSellerExchangeRequest(
      $merchantUid: String!
      $reshipExchangeRequestInput: ReshipExchangeRequestInput!
    ) {
      reshipMeSellerExchangeRequest(
        merchantUid: $merchantUid
        reshipExchangeRequestInput: $reshipExchangeRequestInput
      ) {
        merchantUid
      }
    }
  `);

  const reshipExchangeRequest = async (
    merchantUid: string,
    courierId: ReshipExchangeRequestInput['courierId'],
    trackCode: ReshipExchangeRequestInput['trackCode'],
  ) => {
    await _reshipExchangeRequest({
      variables: {
        merchantUid,
        reshipExchangeRequestInput: {
          courierId,
          trackCode,
        },
      },
    });
  };

  return {reshipExchangeRequest};
};
