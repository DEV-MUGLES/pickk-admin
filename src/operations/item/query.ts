import {gql} from '@apollo/client';

import {OperationType} from '../type';

export const ITEMS_QUERY: OperationType = {
  gql: gql`
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
        salePrice
        finalPrice
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
