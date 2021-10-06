import {gql, useQuery} from '@apollo/client';
import {Item, ItemUrl, ItemCategory, QueryItemsArgs} from '@pickk/common';

const GET_ME_SELLER_ITEMS = gql`
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

export const useItems = () => {
  return useQuery<{meSellerItems: ItemDataType}, QueryItemsArgs>(
    GET_ME_SELLER_ITEMS,
  );
};
