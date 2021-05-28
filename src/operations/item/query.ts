import {gql} from '@apollo/client';
import {OperationType} from '../type';

import {ITEM_OPTION_FARG, ITEM_PRICE_FRAG} from './fragment';

export const ITEMS_QUERY: OperationType = {
  gql: gql`
    ${ITEM_PRICE_FRAG}
    ${ITEM_OPTION_FARG}
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
        options {
          ...ItemOptionFrag
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
