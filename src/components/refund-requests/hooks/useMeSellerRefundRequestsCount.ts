import {gql, useQuery} from '@apollo/client';
import {Query, QueryMeSellerRefundRequestsCountArgs} from '@pickk/common';

// 미니 대시보드 값
export const useMeSellerRefundRequestsCount = () => {
  const {data} = useQuery<
    Pick<Query, 'meSellerRefundRequestsCount'>,
    QueryMeSellerRefundRequestsCountArgs
  >(gql`
    query MeSellerRefundRequestsCount {
      meSellerRefundRequestsCount {
        id
        confirmed
        lastUpdatedAt
        picked
        rejected
        requested
      }
    }
  `);

  return {data: data?.meSellerRefundRequestsCount ?? {}};
};
