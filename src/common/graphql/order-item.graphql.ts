import {gql} from '@apollo/client';

export const BASE_ORDER_ITEM_FRAGMENT = gql`
  fragment BaseOrderItemFragment on OrderItem {
    id
    merchantUid
    orderMerchantUid
    paidAt
    status
    claimStatus
    itemName
    productVariantName
    quantity
    order {
      id
      receiver {
        id
        name
        phoneNumber
        baseAddress
        detailAddress
      }
      buyer {
        id
        name
        phoneNumber
        email
      }
    }
    courier {
      id
      name
    }
    trackCode
  }
`;

export const GET_ORDER_ITEMS = gql`
  query MeSellerOrderItems {
    meSellerOrderItems {
      ...BaseOrderItemFragment
    }
    ${BASE_ORDER_ITEM_FRAGMENT}
  }
`;
