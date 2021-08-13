import {gql, useQuery} from '@apollo/client';
import {
  OrderItemsCountOutput,
  QueryMeSellerOrderItemsCountArgs,
} from '@pickk/common';

// @TODO : confirmed 필드 추가
export const useShipmentPreview = () => {
  const {data} = useQuery<
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

  return {data: data?.meSellerOrderItemsCount ?? {}};
};
