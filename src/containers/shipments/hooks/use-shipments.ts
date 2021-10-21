import {OrderItemFilter, OrderItemStatus} from '@pickk/common';

import {BoardDataFetcher} from '@components/common/templates/board';
import {
  FlattenPlacementDataType,
  flattenPlacementRecord,
} from '@containers/placements/hooks';

import {useBaseOrderItems} from '@containers/order-items/hooks';

const flattenShipmentRecord = flattenPlacementRecord;

export type FlattenShipmentDataType = FlattenPlacementDataType;

const {Shipping, Shipped} = OrderItemStatus;

export const useShipments: BoardDataFetcher<
  FlattenShipmentDataType,
  OrderItemFilter
> = ({filter, pageInput, query}) => {
  const result = useBaseOrderItems({
    filter: {
      ...filter,
      /** status 필터가 있는 경우 statusIn은 무시된다. */
      ...(filter.status ? {} : {statusIn: [Shipping, Shipped]}),
      claimStatusIsNull: true,
    },
    pageInput,
    query,
  });

  return {
    ...result,
    data: !!result.data ? result.data.map(flattenShipmentRecord) : [],
  };
};
