import {useQuery} from '@apollo/client';
import {
  QueryMeSellerOrderItemsArgs,
  OrderItemFilter,
  OrderItemStatus,
  Shipment,
  Courier,
  OrderBuyer,
  OrderReceiver,
} from '@pickk/common';

import {BoardDataFetcher} from '@components/common/templates/board';
import {useOrderItemsCount} from '@containers/order-items/hooks';

import {
  GET_ORDER_ITEMS,
  OrderItemDataType,
} from '@containers/order-items/hooks';

export const GET_PLACEMENTS = GET_ORDER_ITEMS;

export type PlacementDataType = OrderItemDataType;

export const flattenPlacementRecord = (record: PlacementDataType) => {
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

export const usePlacements: BoardDataFetcher<
  FlattenPlacementDataType,
  OrderItemFilter
> = ({filter, pageInput}) => {
  const orderItemFilter = {
    ...filter,
    /** status 필터가 있는 경우 statusIn은 무시된다. */
    ...(filter.status ? {} : {statusIn: [Paid, ShipReady]}),
    claimStatus: null,
  };

  const {data, loading, refetch} = useQuery<
    {meSellerOrderItems: PlacementDataType[]},
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
      ? data.meSellerOrderItems.map(flattenPlacementRecord)
      : [],
    total,
    loading,
    refetch,
  };
};
