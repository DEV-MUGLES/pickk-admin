import {gql, useQuery} from '@apollo/client';
import {
  Courier,
  Order,
  OrderBuyer,
  OrderItem,
  OrderReceiver,
  Shipment,
  QueryMeSellerOrderItemsArgs,
} from '@pickk/common';

const GET_ORDER_ITEMS = gql`
  query MeSellerOrderItems(
    $orderItemFilter: OrderItemFilter
    $pageInput: PageInput
  ) {
    meSellerOrderItems(
      orderItemFilter: $orderItemFilter
      pageInput: $pageInput
    ) {
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
      isConfirmed

      shipment {
        id
        trackCode
        courierId
        courier {
          id
          name
          code
        }
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
          receiverName
          phoneNumber
          postalCode
          baseAddress
          detailAddress
          message
        }
      }
    }
  }
`;

export type OrderItemDataType = Pick<
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
  | 'isConfirmed'
> & {
  shipment: Pick<Shipment, 'id' | 'trackCode' | 'courierId'> & {
    courier: Pick<Courier, 'id' | 'name' | 'code'>;
  };
  order: Pick<Order, 'id'> & {
    buyer: Pick<OrderBuyer, 'id' | 'name' | 'phoneNumber' | 'email'>;
    receiver: Pick<
      OrderReceiver,
      | 'id'
      | 'receiverName'
      | 'phoneNumber'
      | 'postalCode'
      | 'baseAddress'
      | 'detailAddress'
      | 'message'
    >;
  };
};

export const useOrderItems = () => {
  return useQuery<
    {meSellerOrderItems: OrderItemDataType},
    QueryMeSellerOrderItemsArgs
  >(GET_ORDER_ITEMS);
};
