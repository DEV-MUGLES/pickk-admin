import {gql, useMutation} from '@apollo/client';
import {message} from 'antd';
import {
  Mutation,
  MutationReshipMeSellerExchangeRequestArgs,
  ReshipExchangeRequestInput,
} from '@pickk/common';

// 재발송처리
export const useReshipMeSellerOrderItem = () => {
  const [_reshipMeSellerExchangeRequest] = useMutation<
    Pick<Mutation, 'reshipMeSellerExchangeRequest'>,
    MutationReshipMeSellerExchangeRequestArgs
  >(gql`
    mutation ReshipMeSellerExchangeRequest(
      $merchantUid: String!
      $reshipExchangeRequestInput: ReshipExchangeRequestInput
    ) {
      reshipMeSellerExchangeRequest(
        merchantUid: $merchantUid
        reshipExchangeRequestInput: $reshipExchangeRequestInput
      ) {
        merchantUid
      }
    }
  `);

  const reshipMeSellerExchangeRequest = async (
    merchantUid: string,
    courierId: ReshipExchangeRequestInput['courierId'],
    trackCode: ReshipExchangeRequestInput['trackCode'],
  ) => {
    try {
      await _reshipMeSellerExchangeRequest({
        variables: {
          merchantUid,
          reshipExchangeRequestInput: {
            courierId,
            trackCode,
          },
        },
      });

      message.success('적용되었습니다.');
    } catch (error) {
      message.error(`실패했습니다. - ${error}`);
    }
  };

  return {reshipMeSellerExchangeRequest};
};
