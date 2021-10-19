import {gql, useQuery} from '@apollo/client';
import {
  Courier,
  Order,
  OrderBuyer,
  OrderItem,
  RefundRequest,
  Shipment,
  QueryMeSellerRefundRequestsArgs,
  RefundRequestFilter,
} from '@pickk/common';

import {BoardDataFetcher} from '@components/new-common/template/board';

import {useRefundRequestsCount} from './use-refund-requests-count';

const GET_REFUND_REQUESTS = gql`
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
  | 'status'
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

export const flattenRefundRequestRecord = (record: RefundRequestDataType) => {
  const {order, shipment} = record;
  const {buyer} = order;
  return {
    ...record,
    buyerName: buyer?.name,
    buyerPhoneNumber: buyer?.phoneNumber,
    courierCode: shipment?.courier.code,
    trackCode: shipment?.trackCode,
  };
};

export type FlattenRefundRequestDataType = ReturnType<
  typeof flattenRefundRequestRecord
>;

export const useRefundRequests: BoardDataFetcher<
  FlattenRefundRequestDataType,
  RefundRequestFilter
> = ({filter, pageInput}) => {
  const {data, loading, refetch} = useQuery<
    {meSellerRefundRequests: RefundRequestDataType[]},
    QueryMeSellerRefundRequestsArgs
  >(GET_REFUND_REQUESTS, {
    variables: {
      refundRequestFilter: filter,
      pageInput,
    },
  });

  const total = useRefundRequestsCount({filter});

  return {
    data: !!data?.meSellerRefundRequests
      ? data.meSellerRefundRequests.map(flattenRefundRequestRecord)
      : [],
    total,
    loading,
    refetch,
  };
};
