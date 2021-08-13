import {gql, useQuery} from '@apollo/client';
import {
  OrderItemsCountOutput,
  QueryMeSellerOrderItemsCountArgs,
} from '@pickk/common';

export const usePlacementPreview = () => {
  const {data} = useQuery<
    {
      meSellerOrderItemsCount: Pick<
        OrderItemsCountOutput,
        | 'id'
        | 'paid'
        | 'ship_ready'
        | 'process_delayed_paid'
        | 'process_delayed_ship_ready'
        | 'lastUpdatedAt'
      >;
    },
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
