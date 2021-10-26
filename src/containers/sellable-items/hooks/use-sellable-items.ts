import {ItemFilter} from '@pickk/common';

import {BoardDataFetcher} from '@components/common/templates/board';
import {ItemDataType, useItems} from '@containers/items/hooks';

export type SellableItemDataType = ItemDataType;

export const useSellableItems: BoardDataFetcher<
  SellableItemDataType,
  ItemFilter
> = ({filter, pageInput}) => {
  return useItems({filter: {isSellable: true, ...filter}, pageInput});
};
