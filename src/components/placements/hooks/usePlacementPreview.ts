import {gql, useQuery} from '@apollo/client';
import {
  OrderItemsCountOutput,
  QueryMeSellerOrderItemsCountArgs,
} from '@pickk/common';

import {PreviewDataResult} from '@src/components/common/organisms/Board/preview';

export const usePlacementPreview = (): PreviewDataResult => {
  const {data, refetch} = useQuery<
    {
      meSellerOrderItemsCount: Pick<
        OrderItemsCountOutput,
        | 'id'
        | 'Paid'
        | 'ShipReady'
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

  return {
    data: data?.meSellerOrderItemsCount ?? {},
    reload: () => refetch({forceUpdate: true}),
  };
};
