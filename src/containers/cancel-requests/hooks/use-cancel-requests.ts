import {useQuery} from '@apollo/client';
import {
  QueryMeSellerOrderItemsArgs,
  OrderItemFilter,
  OrderItemClaimStatus,
} from '@pickk/common';

import {BoardDataFetcher} from '@components/common/templates/board';
import {useOrderItemsCount} from '@containers/order-items/hooks';

import {
  GET_ORDER_ITEMS,
  OrderItemDataType,
} from '@containers/order-items/hooks';

export const GET_CANCEL_REQUESTS = GET_ORDER_ITEMS;

export type CancelRequestDataType = OrderItemDataType;

const {Cancelled, CancelRequested} = OrderItemClaimStatus;

export const useCancelRequests: BoardDataFetcher<
  CancelRequestDataType,
  OrderItemFilter
> = ({filter, pageInput}) => {
  const orderItemFilter: OrderItemFilter = {
    ...filter,
    claimStatusIn: [Cancelled, CancelRequested],
  };

  const {data, loading, refetch} = useQuery<
    {meSellerOrderItems: CancelRequestDataType[]},
    QueryMeSellerOrderItemsArgs
  >(GET_CANCEL_REQUESTS, {
    variables: {
      orderItemFilter,
      pageInput,
    },
  });

  const total = useOrderItemsCount({filter: orderItemFilter});

  return {
    data: data?.meSellerOrderItems,
    total,
    loading,
    refetch,
  };
};
