import {gql, useQuery} from '@apollo/client';
import {
  OrderItemsCountOutput,
  QueryMeSellerOrderItemsCountArgs,
} from '@pickk/common';

import {PreviewDataResult} from '@src/components/common/organisms/Board/preview';

// @TODO : confirmed 필드 추가
export const useShipmentPreview = (): PreviewDataResult => {
  const {data, refetch} = useQuery<
    {
      meSellerOrderItemsCount: Pick<
        OrderItemsCountOutput,
        'id' | 'shipping' | 'shipped' | 'lastUpdatedAt'
      >;
    },
    QueryMeSellerOrderItemsCountArgs
  >(gql`
    query MeSellerOrderItemsCount($forceUpdate: Boolean) {
      meSellerOrderItemsCount(forceUpdate: $forceUpdate) {
        id
        shipping
        shipped

        lastUpdatedAt
      }
    }
  `);

  return {
    data: data?.meSellerOrderItemsCount ?? {},
    reload: () => refetch({forceUpdate: true}),
  };
};
