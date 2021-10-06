import {gql, useQuery} from '@apollo/client';
import {
  Courier,
  ExchangeRequest,
  Order,
  OrderBuyer,
  OrderItem,
  OrderReceiver,
  Shipment,
  QueryMeSellerExchangeRequestsArgs,
} from '@pickk/common';

const GET_EXCHANGE_REQUESTS = gql`
  query MeSellerExchangeRequests(
    $exchangeRequestFilter: ExchangeRequestFilter
    $pageInput: PageInput
  ) {
    meSellerExchangeRequests(
      exchangeRequestFilter: $exchangeRequestFilter
      pageInput: $pageInput
    ) {
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
            receiverName
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

export type ExchangeRequestDataType = Pick<
  ExchangeRequest,
  'orderItemMerchantUid' | 'status' | 'requestedAt' | 'faultOf' | 'reason'
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
        | 'receiverName'
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

export const useExchangeRequests = () => {
  return useQuery<
    {meSellerExchangeRequests: ExchangeRequestDataType},
    QueryMeSellerExchangeRequestsArgs
  >(GET_EXCHANGE_REQUESTS);
};
