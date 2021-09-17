import {gql} from '@apollo/client';
import {
  Courier,
  Order,
  OrderBuyer,
  OrderItem,
  RefundRequest,
  Shipment,
} from '@pickk/common';

export type BaseRefundRequest = Pick<
  RefundRequest,
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

export const BASE_REFUND_REQUEST_FRAGMENT = gql`
  fragment BaseRefundRequestFragment on RefundRequest {
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
