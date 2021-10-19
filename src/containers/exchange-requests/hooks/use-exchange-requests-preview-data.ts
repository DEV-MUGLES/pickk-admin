import {gql, useQuery} from '@apollo/client';
import {Query, QueryMeSellerExchangeRequestsCountArgs} from '@pickk/common';

import {PreviewDataResult} from '@components/new-common/organisms/board-preview';

export const useExchangeRequestsPreveiwData = (): PreviewDataResult => {
  const {data, refetch} = useQuery<
    Pick<Query, 'meSellerExchangeRequestsCount'>,
    QueryMeSellerExchangeRequestsCountArgs
  >(gql`
    query MeSellerExchangeRequestsCount($forceUpdate: Boolean) {
      meSellerExchangeRequestsCount(forceUpdate: $forceUpdate) {
        id
        Requested
        Picked
        Reshipping
        Reshipped
        process_delayed
        lastUpdatedAt
      }
    }
  `);

  return {
    data: data?.meSellerExchangeRequestsCount ?? {},
    reload: () => refetch({forceUpdate: true}),
  };
};
