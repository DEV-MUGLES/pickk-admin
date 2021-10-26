import {OrderItemClaimStatus, OrderItemSearchFilter} from '@pickk/common';

import {BoardDataFetcher} from '@components/common/templates/board';

import {
  OrderItemDataType,
  useBaseOrderItems,
} from '@containers/order-items/hooks';

const {Cancelled, CancelRequested} = OrderItemClaimStatus;

export const useCancelRequests: BoardDataFetcher<
  OrderItemDataType,
  OrderItemSearchFilter
> = ({filter, pageInput, query}) => {
  return useBaseOrderItems({
    filter: {
      ...filter,
      claimStatusIn: [Cancelled, CancelRequested],
    },
    pageInput,
    query,
  });
};
