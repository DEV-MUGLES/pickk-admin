import {OrderItemStatus, OrderItemSearchFilter} from '@pickk/common';

import {BoardDataFetcher} from '@components/common/templates/board';

import {
  OrderItemDataType,
  useBaseOrderItems,
} from '@containers/order-items/hooks';

export const flattenPlacementRecord = (record: OrderItemDataType) => {
  const {order, shipment} = record;
  const {buyer, receiver} = order;
  return {
    ...record,
    courierId: shipment?.courierId,
    trackCode: shipment?.trackCode,
    courierName: shipment?.courier?.name,
    courierCode: shipment?.courier?.code,
    buyerName: buyer?.name,
    buyerEmail: buyer?.email,
    buyerPhoneNumber: buyer?.phoneNumber,
    receiverReceiverName: receiver?.receiverName,
    receiverPhoneNumber: receiver?.phoneNumber,
    receiverPostalCode: receiver?.postalCode,
    receiverBaseAddress: receiver?.baseAddress,
    receiverDetailAddress: receiver?.detailAddress,
    receiverFullAddress: receiver?.baseAddress + receiver?.detailAddress,
    receiverMessage: receiver?.message,
  };
};

export type FlattenPlacementDataType = ReturnType<
  typeof flattenPlacementRecord
>;

const {Paid, ShipReady} = OrderItemStatus;

export const placementsBaseFilter: OrderItemSearchFilter = {
  claimStatusIsNull: true,
  statusIn: [Paid, ShipReady],
};

export const usePlacements: BoardDataFetcher<
  FlattenPlacementDataType,
  OrderItemSearchFilter
> = ({filter, pageInput, query}) => {
  const result = useBaseOrderItems({
    filter: {
      ...filter,
      ...placementsBaseFilter,
      /** status 필터가 있는 경우 statusIn은 무시된다. */
      ...(filter.status ? {statusIn: undefined} : {}),
    },
    pageInput,
    query,
  });

  return {
    ...result,
    data: !!result.data ? result.data.map(flattenPlacementRecord) : [],
  };
};
