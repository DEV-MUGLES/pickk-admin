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
