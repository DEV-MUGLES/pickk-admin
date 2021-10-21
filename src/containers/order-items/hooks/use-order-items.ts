import {OrderItemSearchFilter, OrderItemStatus} from '@pickk/common';

import {BoardDataFetcher} from '@components/common/templates/board';

import {OrderItemDataType, useBaseOrderItems} from './use-base-order-items';

const {Pending, Failed, ...statusIn} = OrderItemStatus;

export const useOrderItems: BoardDataFetcher<
  OrderItemDataType,
  OrderItemSearchFilter
> = ({filter, pageInput, query}) => {
  return useBaseOrderItems({
    filter: {
      ...filter,
      statusIn: Object.values(statusIn),
    },
    pageInput,
    query,
  });
};
