import {gql} from '@apollo/client';
import {
  Courier,
  Order,
  OrderBuyer,
  OrderItem,
  OrderReceiver,
  Shipment,
  RefundRequest,
} from '@pickk/common';

export type BaseOrderItem = Pick<
  OrderItem,
  | 'id'
  | 'merchantUid'
  | 'orderMerchantUid'
  | 'status'
  | 'shippingAt'
  | 'paidAt'
  | 'claimStatus'
  | 'itemId'
  | 'itemName'
  | 'productVariantName'
  | 'quantity'
  | 'itemFinalPrice'
  | 'recommenderNickname'
> & {
  shipment: Pick<Shipment, 'trackCode' | 'courierId'> & {
    courier: Pick<Courier, 'id' | 'name'>;
  };
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
      | 'message'
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
    itemId
    itemName
    productVariantName
    quantity
    itemFinalPrice
    recommenderNickname

    shipment {
      courierId
      courier {
        id
        name
      }
      trackCode
    }

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
        message
      }
    }
  }
`;

export const GET_ORDER_ITEMS = gql`
  query MeSellerOrderItems {
    meSellerOrderItems {
      ...BaseOrderItemFragment
    }
  }
  ${BASE_ORDER_ITEM_FRAGMENT}
`;