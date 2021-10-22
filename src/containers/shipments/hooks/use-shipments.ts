import {OrderItemSearchFilter, OrderItemStatus} from '@pickk/common';

import {BoardDataFetcher} from '@components/common/templates/board';
import {
  FlattenPlacementDataType,
  flattenPlacementRecord,
} from '@containers/placements/hooks';

import {useBaseOrderItems} from '@containers/order-items/hooks';

const flattenShipmentRecord = flattenPlacementRecord;

export type FlattenShipmentDataType = FlattenPlacementDataType;

const {Shipping, Shipped} = OrderItemStatus;

export const shipmentsBaseFilter: OrderItemSearchFilter = {
  claimStatusIsNull: true,
  statusIn: [Shipping, Shipped],
};

export const useShipments: BoardDataFetcher<
  FlattenShipmentDataType,
  OrderItemSearchFilter
> = ({filter, pageInput, query}) => {
  const result = useBaseOrderItems({
    filter: {
      ...filter,
      ...shipmentsBaseFilter,
      /** status 필터가 있는 경우 statusIn은 무시된다. */
      ...(filter.status ? {statusIn: undefined} : {}),
    },
    pageInput,
    query,
  });

  return {
    ...result,
    data: !!result.data ? result.data.map(flattenShipmentRecord) : [],
  };
};
