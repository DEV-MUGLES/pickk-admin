import {gql, useQuery} from '@apollo/client';
import {
  Item,
  ItemFilter,
  QueryMeSellerItemsArgs,
  ItemUrl,
  ItemCategory,
} from '@pickk/common';

import {BoardDataFetcher} from '@components/new-common/template/board';

import {useItemsCount} from './use-items-count';

const GET_ITEMS = gql`
  query meSellerItems($itemFilter: ItemFilter, $pageInput: PageInput) {
    meSellerItems(itemFilter: $itemFilter, pageInput: $pageInput) {
      id
      imageUrl
      name
      originalPrice
      sellPrice
      isSellable
      createdAt
      urls {
        id
        isPrimary
        url
      }
      majorCategory {
        id
        name
      }
      minorCategory {
        id
        name
      }
    }
  }
`;

export type ItemDataType = Pick<
  Item,
  | 'id'
  | 'imageUrl'
  | 'name'
  | 'originalPrice'
  | 'sellPrice'
  | 'isSellable'
  | 'createdAt'
> & {
  urls: Array<Pick<ItemUrl, 'id' | 'isPrimary' | 'url'>>;
  majorCategory: Pick<ItemCategory, 'id' | 'name'>;
  minorCategory: Pick<ItemCategory, 'id' | 'name'>;
};

const formatItemFilter = (filter: ItemFilter) => {
  const result = {
    ...filter,
    ...(filter['category']
      ? {
          majorCategoryId: filter['category'][0],
          minorCategoryId: filter['category'][1],
        }
      : {}),
  };

  delete result['category'];

  return result;
};

export const useItems: BoardDataFetcher<ItemDataType, ItemFilter> = ({
  filter,
  pageInput,
}) => {
  const itemFilter: ItemFilter = {
    ...formatItemFilter(filter),
  };

  const {data, loading, refetch} = useQuery<
    {meSellerItems: ItemDataType[]},
    QueryMeSellerItemsArgs
  >(GET_ITEMS, {
    variables: {
      itemFilter,
      pageInput,
    },
  });
  const total = useItemsCount({filter: itemFilter});

  return {data: data?.meSellerItems, total, loading, refetch};
};
