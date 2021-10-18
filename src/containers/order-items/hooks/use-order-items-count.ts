import {gql, useQuery} from '@apollo/client';
import {
  Query,
  QueryMeSellerOrderItemsArgs,
  OrderItemFilter,
} from '@pickk/common';

export const useOrderItemsCount = ({filter}: {filter: OrderItemFilter}) => {
  const {data} = useQuery<
    Pick<Query, 'meSellerOrderItems'>,
    QueryMeSellerOrderItemsArgs
  >(
    gql`
      query MeSellerOrderItems($orderItemFilter: OrderItemFilter) {
        meSellerOrderItems(orderItemFilter: $orderItemFilter) {
          id
        }
      }
    `,
    {
      variables: {
        orderItemFilter: filter,
      },
    },
  );

  return (data?.meSellerOrderItems || []).length;
};
