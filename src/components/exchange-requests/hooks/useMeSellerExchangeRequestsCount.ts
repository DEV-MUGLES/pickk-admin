import {gql, useQuery} from '@apollo/client';
import {Query, QueryMeSellerExchangeRequestsCountArgs} from '@pickk/common';

export const useMeSellerExchangeRequestsCount = () => {
  const {data} = useQuery<
    Pick<Query, 'meSellerExchangeRequestsCount'>,
    QueryMeSellerExchangeRequestsCountArgs
  >(gql`
    query MeSellerExchangeRequestsCount($forceUpdate: Boolean) {
      meSellerExchangeRequestsCount(forceUpdate: $forceUpdate) {
        id
        requested
        picked
        reshipping
        reshipped
      }
    }
  `);

  return {data: data?.meSellerExchangeRequestsCount ?? {}};
};
