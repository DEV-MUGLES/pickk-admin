import {gql, useQuery} from '@apollo/client';
import {
  OrderItemsCountOutput,
  QueryMeSellerOrderItemsCountArgs,
} from '@pickk/common';

import {PreviewDataResult} from '@components/new-common/organisms/board-preview';

const GET_PLACEMENTS_COUNT = gql`
  query MeSellerOrderItemsCount($forceUpdate: Boolean) {
    meSellerOrderItemsCount(forceUpdate: $forceUpdate) {
      id
      Paid
      ShipReady
      process_delayed_Paid
      process_delayed_ShipReady
      lastUpdatedAt
    }
  }
`;

export const usePlacementsPreviewData = (): PreviewDataResult => {
  const {data, refetch} = useQuery<
    {
      meSellerOrderItemsCount: Pick<
        OrderItemsCountOutput,
        | 'id'
        | 'Paid'
        | 'ShipReady'
        | 'process_delayed_Paid'
        | 'process_delayed_ShipReady'
        | 'lastUpdatedAt'
      >;
    },
    QueryMeSellerOrderItemsCountArgs
  >(GET_PLACEMENTS_COUNT);

  return {
    data: data?.meSellerOrderItemsCount ?? {},
    reload: () => refetch({forceUpdate: true}),
  };
};
