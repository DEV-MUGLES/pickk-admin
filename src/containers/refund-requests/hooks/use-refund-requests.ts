import {gql, useQuery} from '@apollo/client';
import {
  Courier,
  Order,
  OrderBuyer,
  OrderItem,
  RefundRequest,
  Shipment,
  QueryMeSellerRefundRequestsArgs,
} from '@pickk/common';

export const GET_REFUND_REQUESTS = gql`
  query MeSellerRefundRequests(
    $pageInput: PageInput
    $refundRequestFilter: RefundRequestFilter
  ) {
    meSellerRefundRequests(
      pageInput: $pageInput
      refundRequestFilter: $refundRequestFilter
    ) {
      merchantUid
      orderMerchantUid
      status
      requestedAt
      reason
      amount
      shippingFee
      faultOf
      orderItems {
        id
        itemName
        productVariantName
        quantity
      }
      order {
        id
        buyer {
          id
          name
          phoneNumber
        }
      }
      shipment {
        id
        trackCode
        courier {
          id
          code
        }
      }
    }
  }
`;

export type RefundRequestDataType = Pick<
  RefundRequest,
  | 'merchantUid'
  | 'orderMerchantUid'
  | 'requestedAt'
  | 'reason'
  | 'amount'
  | 'shippingFee'
  | 'faultOf'
> & {
  orderItems: Array<
    Pick<OrderItem, 'id' | 'itemName' | 'productVariantName' | 'quantity'>
  >;
  order: Pick<Order, 'id'> & {
    buyer: Pick<OrderBuyer, 'id' | 'name' | 'phoneNumber'>;
  };
  shipment: Pick<Shipment, 'id' | 'trackCode'> & {
    courier: Pick<Courier, 'id' | 'code'>;
  };
};

export const useRefundRequests = () => {
  return useQuery<
    {meSellerRefundRequests: RefundRequestDataType},
    QueryMeSellerRefundRequestsArgs
  >(GET_REFUND_REQUESTS);
};
