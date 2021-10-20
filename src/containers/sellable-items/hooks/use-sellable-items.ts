import {gql, useLazyQuery, useQuery} from '@apollo/client';
import {
  Item,
  ItemFilter,
  QueryMeSellerItemsArgs,
  ItemUrl,
  ItemCategory,
  Product,
} from '@pickk/common';

import {BoardDataFetcher} from '@components/common/templates/board';
import {useSellableItemsCount} from './use-sellable-items-count';

const GET_SELLABLE_ITEMS = gql`
  query meSellerItems($itemFilter: ItemFilter, $pageInput: PageInput) {
    meSellerItems(itemFilter: $itemFilter, pageInput: $pageInput) {
      id
      imageUrl
      name
      originalPrice
      sellPrice
      finalPrice
      isInfiniteStock
      isSoldout
      isMdRecommended
      isSellable
      createdAt
      sellableAt
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
      products {
        id
        stock
        isDeleted
      }
    }
  }
`;

export type SellableItemDataType = Pick<
  Item,
  | 'id'
  | 'imageUrl'
  | 'name'
  | 'originalPrice'
  | 'sellPrice'
  | 'finalPrice'
  | 'isInfiniteStock'
  | 'isSoldout'
  | 'isMdRecommended'
  | 'isSellable'
  | 'createdAt'
  | 'sellableAt'
> & {
  urls: Array<Pick<ItemUrl, 'id' | 'isPrimary' | 'url'>>;
  majorCategory: Pick<ItemCategory, 'id' | 'name'>;
  minorCategory: Pick<ItemCategory, 'id' | 'name'>;
  products: Array<Pick<Product, 'id' | 'stock' | 'isDeleted'>>;
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

export const useSellableItems: BoardDataFetcher<
  SellableItemDataType,
  ItemFilter
> = ({filter, pageInput}) => {
  const itemFilter: ItemFilter = {
    ...formatItemFilter(filter),
    isSellable: true,
  };

  const {data, loading, refetch} = useQuery<
    {meSellerItems: SellableItemDataType[]},
    QueryMeSellerItemsArgs
  >(GET_SELLABLE_ITEMS, {
    variables: {
      itemFilter,
      pageInput,
    },
  });

  const total = useSellableItemsCount({filter: itemFilter});

  return {data: data?.meSellerItems, total, loading, refetch};
};
