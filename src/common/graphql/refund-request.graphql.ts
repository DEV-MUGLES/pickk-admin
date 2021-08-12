import {gql} from '@apollo/client';
import {Order, OrderBuyer, OrderItem, RefundRequest} from '@pickk/common';

export type BaseRefundRequest = Pick<
  RefundRequest,
  | 'id'
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
};

export const BASE_REFUND_REQUEST_FRAGMENT = gql`
  fragment BaseRefundRequestFragment on RefundRequest {
    id
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
  }
`;

export const GET_REFUND_REQUESTS = gql`
  query MeSellerRefundRequests(
    $pageInput: PageInput
    $refundRequestFilter: RefundRequestFilter
  ) {
    meSellerRefundRequests(
      pageInput: $pageInput
      refundRequestFilter: $refundRequestFilter
    ) {
      ...BaseRefundRequestFragment
    }
  }
  ${BASE_REFUND_REQUEST_FRAGMENT}
`;
