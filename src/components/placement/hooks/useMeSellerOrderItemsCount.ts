import {gql, useQuery} from '@apollo/client';
import {Query, QueryMeSellerOrderItemsCountArgs} from '@pickk/common';

export const useMeSellerOrderItemsCount = () => {
  const {data} = useQuery<
    Pick<Query, 'meSellerOrderItemsCount'>,
    QueryMeSellerOrderItemsCountArgs
  >(gql`
    query MeSellerOrderItemsCount($forceUpdate: Boolean) {
      meSellerOrderItemsCount(forceUpdate: $forceUpdate) {
        id
        paid
        ship_ready
        process_delayed_paid
        process_delayed_ship_ready
        lastUpdatedAt
      }
    }
  `);
  return {data: data?.meSellerOrderItemsCount ?? {}};
};
