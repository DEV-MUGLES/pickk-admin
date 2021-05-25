import {gql} from '@apollo/client';
import {OperationType} from '../type';

import {ITEM_PRICE_FRAG} from './fragment';

export const ITEMS_QUERY: OperationType = {
  gql: gql`
    ${ITEM_PRICE_FRAG}
    query Items($itemFilter: ItemFilter, $pageInput: PageInput) {
      items(itemFilter: $itemFilter, pageInput: $pageInput) {
        id
        imageUrl
        majorCategory {
          id
          name
        }
        minorCategory {
          id
          name
        }
        name
        originalPrice
        sellPrice
        finalPrice
        prices {
          ...ItemPriceFrag
        }
        products {
          stock
        }
        isInfiniteStock
        isSoldout
        reviewCount @client
        purchasedCount @client
        notice {
          id
          type
          message
          startAt
          endAt
        }
        isMdRecommended
        isSellable
        urls {
          isPrimary
          url
        }
        createdAt
      }
    }
  `,
  dataName: 'items',
};
