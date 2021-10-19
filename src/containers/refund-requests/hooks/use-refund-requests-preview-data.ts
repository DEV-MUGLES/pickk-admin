import {gql, useQuery} from '@apollo/client';
import {Query, QueryMeSellerRefundRequestsCountArgs} from '@pickk/common';

import {PreviewDataResult} from '@components/new-common/organisms/board-preview';

export const useRefundRequestsPreveiwData = (): PreviewDataResult => {
  const {data, refetch} = useQuery<
    Pick<Query, 'meSellerRefundRequestsCount'>,
    QueryMeSellerRefundRequestsCountArgs
  >(gql`
    query MeSellerRefundRequestsCount($forceUpdate: Boolean) {
      meSellerRefundRequestsCount(forceUpdate: $forceUpdate) {
        id
        Confirmed
        lastUpdatedAt
        Picked
        Rejected
        Requested
        process_delayed
      }
    }
  `);

  return {
    data: data?.meSellerRefundRequestsCount ?? {},
    reload: () => refetch({forceUpdate: true}),
  };
};
