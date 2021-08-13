import {gql, useQuery} from '@apollo/client';
import {Query, QueryMeSellerExchangeRequestsCountArgs} from '@pickk/common';

import {PreviewDataResult} from '@src/components/common/organisms/Board/preview';

export const useExchangeRequestPreview = (): PreviewDataResult => {
  const {data, refetch} = useQuery<
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
