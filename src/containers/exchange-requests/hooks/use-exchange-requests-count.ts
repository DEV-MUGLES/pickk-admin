import {gql, useQuery} from '@apollo/client';
import {
  Query,
  QueryMeSellerExchangeRequestsArgs,
  ExchangeRequestFilter,
} from '@pickk/common';

export const useExchangeRequestsCount = ({
  filter,
}: {
  filter: ExchangeRequestFilter;
}) => {
  const {data} = useQuery<
    Pick<Query, 'meSellerExchangeRequests'>,
    QueryMeSellerExchangeRequestsArgs
  >(
    gql`
      query MeSellerExchangeRequests(
        $exchangeRequestFilter: ExchangeRequestFilter
      ) {
        meSellerExchangeRequests(
          exchangeRequestFilter: $exchangeRequestFilter
        ) {
          merchantUid
        }
      }
    `,
    {
      variables: {
        exchangeRequestFilter: filter,
      },
    },
  );

  return (data?.meSellerExchangeRequests || []).length;
};
