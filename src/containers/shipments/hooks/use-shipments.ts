import {useQuery} from '@apollo/client';
import {
  QueryMeSellerOrderItemsArgs,
  OrderItemFilter,
  OrderItemStatus,
} from '@pickk/common';

import {BoardDataFetcher} from '@components/new-common/template/board';
import {useOrderItemsCount} from '@containers/order-items/hooks';
import {
  FlattenPlacementDataType,
  flattenPlacementRecord,
} from '@containers/placements/hooks';

import {
  GET_ORDER_ITEMS,
  OrderItemDataType,
} from '@containers/order-items/hooks';

export const GET_PLACEMENTS = GET_ORDER_ITEMS;

export type ShipmentDataType = OrderItemDataType;

export type FlattenShipmentDataType = FlattenPlacementDataType;

const flattenShipmentRecord = flattenPlacementRecord;

const {Shipping, Shipped} = OrderItemStatus;

export const useShipments: BoardDataFetcher<ShipmentDataType, OrderItemFilter> =
  ({filter, pageInput}) => {
    const orderItemFilter: OrderItemFilter = {
      ...filter,
      /** status 필터가 있는 경우 statusIn은 무시된다. */
      ...(filter.status ? {} : {statusIn: [Shipping, Shipped]}),
      claimStatus: null,
    };

    const {data, loading, refetch} = useQuery<
      {meSellerOrderItems: ShipmentDataType[]},
      QueryMeSellerOrderItemsArgs
    >(GET_PLACEMENTS, {
      variables: {
        orderItemFilter,
        pageInput,
      },
    });

    const total = useOrderItemsCount({filter: orderItemFilter});

    return {
      data: !!data?.meSellerOrderItems
        ? data.meSellerOrderItems.map(flattenShipmentRecord)
        : [],
      total,
      loading,
      refetch,
    };
  };
