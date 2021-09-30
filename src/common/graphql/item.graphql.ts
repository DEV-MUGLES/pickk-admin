import {gql} from '@apollo/client';

export const ITEM_PRICE_FRAG = gql`
  fragment ItemPriceFrag on ItemPrice {
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
`;

export const ITEM_OPTION_VALUE_FRAG = gql`
  fragment ItemOptionValueFrag on ItemOptionValue {
    id
    name
    priceVariant
  }
`;

export const ITEM_OPTION_FARG = gql`
  ${ITEM_OPTION_VALUE_FRAG}
  fragment ItemOptionFrag on ItemOption {
    id
    name
    values {
      ...ItemOptionValueFrag
    }
  }
`;

export const PRODUCT_SHIPPING_RESERVE_POLICY_FRAG = gql`
  fragment ProductShippingReservePolicyFrag on ProductShippingReservePolicy {
    createdAt
    estimatedShippingBegginDate
    id
    stock
    updatedAt
  }
`;

export const PRODUCT_FRAG = gql`
  ${ITEM_OPTION_VALUE_FRAG}
  ${PRODUCT_SHIPPING_RESERVE_POLICY_FRAG}
  fragment ProductFrag on Product {
    createdAt
    id
    itemOptionValues {
      ...ItemOptionValueFrag
    }
    shippingReservePolicy {
      ...ProductShippingReservePolicyFrag
    }
    stock
    updatedAt
    priceVariant
    isDeleted
  }
`;

export const ITEMS_QUERY = gql`
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
        ...ProductFrag
      }
      isInfiniteStock
      isSoldout
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
      sellableAt
    }
  }
  ${ITEM_PRICE_FRAG}
  ${PRODUCT_FRAG}
  ${ITEM_OPTION_FARG}
`;
