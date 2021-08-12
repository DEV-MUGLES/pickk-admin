import {gql} from '@apollo/client';
import {
  Courier,
  ExchangeRequest,
  Order,
  OrderBuyer,
  OrderItem,
  OrderReceiver,
  Shipment,
} from '@pickk/common';

export type BaseExchangeRequest = Pick<
  ExchangeRequest,
  | 'id'
  | 'orderItemMerchantUid'
  | 'status'
  | 'requestedAt'
  | 'faultOf'
  | 'reason'
> & {
  orderItem: Pick<
    OrderItem,
    | 'id'
    | 'orderMerchantUid'
    | 'itemName'
    | 'productVariantName'
    | 'quantity'
    | 'itemFinalPrice'
    | 'recommenderNickname'
  > & {
    order: Pick<Order, 'id'> & {
      buyer: Pick<OrderBuyer, 'id' | 'name' | 'phoneNumber'>;
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
  reshipment: Pick<Shipment, 'id' | 'courierId' | 'trackCode'> & {
    courier: Pick<Courier, 'id' | 'name'>;
  };
};

export const GET_EXCHANGE_REQUEST = gql`
  query MeSellerExchangeRequests(
    $exchangeRequestFilter: ExchangeRequestFilter
    $pageInput: PageInput
  ) {
    meSellerExchangeRequests(
      exchangeRequestFilter: $exchangeRequestFilter
      pageInput: $pageInput
    ) {
      id
      orderItemMerchantUid
      status
      requestedAt
      faultOf
      reason
      orderItem {
        id
        orderMerchantUid
        itemName
        productVariantName
        quantity
        itemFinalPrice
        recommenderNickname
        order {
          id
          buyer {
            id
            name
            phoneNumber
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
      }
      reShipment {
        id
        courierId
        trackCode
        courier {
          id
          name
        }
      }
    }
  }
`;
