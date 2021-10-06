import {QueryHookOptions, gql, useQuery} from '@apollo/client';
import {Query, QueryMeSellerItemsArgs} from '@pickk/common';

// @TODO prices, products, options은 drawer에서 사용할때 fetching 하도록 변경
export const ME_SELLER_ITEMS_QUERY = gql`
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

      prices {
        createdAt
        displayPrice
        endAt
        finalPrice
        id
        isActive
        isBase
        isCrawlUpdating
        itemId
        originalPrice
        pickkDiscountAmount
        pickkDiscountRate
        sellPrice
        startAt
        unit
        updatedAt
      }

      products {
        createdAt
        id
        itemOptionValues {
          id
          name
          priceVariant
        }
        shippingReservePolicy {
          createdAt
          estimatedShippingBegginDate
          id
          stock
          updatedAt
        }
        stock
        updatedAt
        priceVariant
        isDeleted
      }

      options {
        id
        name
        values {
          id
          name
          priceVariant
        }
      }
    }
  }
`;

export const useMeSellerSellableItems = (options?: QueryHookOptions) => {
  return useQuery<Pick<Query, 'meSellerItems'>, QueryMeSellerItemsArgs>(
    ME_SELLER_ITEMS_QUERY,
    options,
  );
};
