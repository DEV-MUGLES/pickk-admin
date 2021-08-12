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
      $id: Int!
      $reshipExchangeRequestInput: ReshipExchangeRequestInput
    ) {
      reshipMeSellerExchangeRequest(
        id: $id
        reshipExchangeRequestInput: $reshipExchangeRequestInput
      ) {
        id
      }
    }
  `);

  const reshipMeSellerExchangeRequest = async (
    id: number,
    reshipExchangeRequestInput: ReshipExchangeRequestInput,
  ) => {
    try {
      await _reshipMeSellerExchangeRequest({
        variables: {
          id,
          reshipExchangeRequestInput,
        },
      });

      message.success('적용되었습니다.');
    } catch (error) {
      message.error(`실패했습니다. - ${error}`);
    }
  };

  return {reshipMeSellerExchangeRequest};
};
