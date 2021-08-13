import {gql, useQuery} from '@apollo/client';
import {Query, QueryMeSellerRefundRequestsCountArgs} from '@pickk/common';

import {PreviewDataResult} from '@src/components/common/organisms/Board/preview';

export const useRefundRequestPreview = (): PreviewDataResult => {
  const {data, refetch} = useQuery<
    Pick<Query, 'meSellerRefundRequestsCount'>,
    QueryMeSellerRefundRequestsCountArgs
  >(gql`
    query MeSellerRefundRequestsCount($forceUpdate: Boolean) {
      meSellerRefundRequestsCount(forceUpdate: $forceUpdate) {
        id
        confirmed
        lastUpdatedAt
        picked
        rejected
        requested
      }
    }
  `);

  return {
    data: data?.meSellerRefundRequestsCount ?? {},
    reload: () => refetch({forceUpdate: true}),
  };
};
