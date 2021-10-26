import {useEffect} from 'react';
import {gql, useQuery} from '@apollo/client';
import {
  Item,
  ItemFilter,
  QueryMeSellerItemsArgs,
  ItemUrl,
  ItemCategory,
  Product,
} from '@pickk/common';

import {BoardDataFetcher} from '@components/common/templates/board';

import {useItemsCount} from './use-items-count';

const GET_ITEMS = gql`
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

export type ItemDataType = Pick<
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

  useEffect(() => {
    /** 첫 로딩시 아이템 활성화, 비활성화 캐시를 업데이트 하기 위함 */
    refetch();
  }, []);

  return {data: data?.meSellerItems, total, loading, refetch};
};
