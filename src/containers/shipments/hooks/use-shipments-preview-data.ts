import {gql, useQuery} from '@apollo/client';
import {
  OrderItemsCountOutput,
  QueryMeSellerOrderItemsCountArgs,
} from '@pickk/common';

import {PreviewDataResult} from '@components/new-common/organisms/board-preview';

const GET_SHIPMENTS_COUNT = gql`
  query MeSellerOrderItemsCount($forceUpdate: Boolean) {
    meSellerOrderItemsCount(forceUpdate: $forceUpdate) {
      id
      Shipping
      Shipped
      confirmed
      lastUpdatedAt
    }
  }
`;

export const useShipmentsPreviewData = (): PreviewDataResult => {
  const {data, refetch} = useQuery<
    {
      meSellerOrderItemsCount: Pick<
        OrderItemsCountOutput,
        'id' | 'Shipping' | 'Shipped' | 'confirmed' | 'lastUpdatedAt'
      >;
    },
    QueryMeSellerOrderItemsCountArgs
  >(GET_SHIPMENTS_COUNT);

  const getCalculatedData = () => {
    if (!data?.meSellerOrderItemsCount) {
      return {};
    }

    const {Shipped, confirmed} = data.meSellerOrderItemsCount;
    return {
      ...data.meSellerOrderItemsCount,
      Shipped: Shipped - confirmed,
    };
  };

  return {
    data: getCalculatedData(),
    reload: () => refetch({forceUpdate: true}),
  };
};
