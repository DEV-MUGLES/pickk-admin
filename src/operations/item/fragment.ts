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
