import {gql, useQuery} from '@apollo/client';
import {
  Courier,
  Order,
  OrderBuyer,
  OrderItem,
  OrderReceiver,
  Shipment,
  OrderItemSearchFilter,
  PageInput,
} from '@pickk/common';

import {BoardDataFetcher} from '@components/common/templates/board';

const ORDER_ITEM_FRAGMENT = gql`
  fragment OrderItemFragment on OrderItem {
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
    confirmedAt

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
`;

export const GET_ORDER_ITEMS = gql`
  query searchMeSellerOrderItems(
    $searchFilter: OrderItemSearchFilter
    $query: String
    $pageInput: PageInput
  ) {
    searchMeSellerOrderItems(
      searchFilter: $searchFilter
      query: $query
      pageInput: $pageInput
    ) {
      result {
        ...OrderItemFragment
      }
      total
    }
  }
  ${ORDER_ITEM_FRAGMENT}
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
  | 'confirmedAt'
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

export const useBaseOrderItems: BoardDataFetcher<
  OrderItemDataType,
  OrderItemSearchFilter
> = ({filter, pageInput, query}) => {
  const {data, loading, refetch} = useQuery<
    {searchMeSellerOrderItems: {result: OrderItemDataType[]; total: number}},
    {searchFilter: OrderItemSearchFilter; pageInput: PageInput; query: string}
  >(GET_ORDER_ITEMS, {
    variables: {
      searchFilter: filter,
      pageInput,
      query,
    },
  });

  return {
    data: data?.searchMeSellerOrderItems.result,
    total: data?.searchMeSellerOrderItems.total,
    loading,
    refetch,
  };
};
