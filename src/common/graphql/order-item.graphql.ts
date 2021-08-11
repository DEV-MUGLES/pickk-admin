import {gql} from '@apollo/client';
import {Order, OrderBuyer, OrderItem, OrderReceiver} from '@pickk/common';

export type BaseOrderItem = Pick<
  OrderItem,
  | 'id'
  | 'merchantUid'
  | 'orderMerchantUid'
  | 'status'
  | 'shippingAt'
  | 'paidAt'
  | 'claimStatus'
  | 'courierId'
  | 'trackCode'
  | 'itemId'
  | 'itemName'
  | 'productVariantName'
  | 'quantity'
  | 'itemFinalPrice'
  | 'recommenderNickname'
> & {
  order: Pick<Order, 'id'> & {
    buyer: Pick<OrderBuyer, 'id' | 'name' | 'phoneNumber' | 'email'>;
    receiver: Pick<
      OrderReceiver,
      | 'id'
      | 'name'
      | 'phoneNumber'
      | 'postalCode'
      | 'baseAddress'
      | 'detailAddress'
    >;
  };
};

export const BASE_ORDER_ITEM_FRAGMENT = gql`
  fragment BaseOrderItemFragment on OrderItem {
    id
    merchantUid
    orderMerchantUid
    status
    shippingAt

    paidAt
    claimStatus
    courierId
    trackCode
    itemId
    itemName
    productVariantName
    quantity

    order {
      id
      buyer {
        id
        name
        phoneNumber
        email
      }
      receiver {
        id
        name
        phoneNumber
        postalCode
        baseAddress
        detailAddress
      }
    }

    itemFinalPrice
    recommenderNickname
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
