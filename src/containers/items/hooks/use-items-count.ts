import {gql, useQuery} from '@apollo/client';
import {Query, QueryMeSellerItemsArgs, ItemFilter} from '@pickk/common';

export const useItemsCount = ({filter}: {filter: ItemFilter}) => {
  const {data} = useQuery<Pick<Query, 'meSellerItems'>, QueryMeSellerItemsArgs>(
    gql`
      query meSellerItems($itemFilter: ItemFilter) {
        meSellerItems(itemFilter: $itemFilter) {
          id
        }
      }
    `,
    {
      variables: {
        itemFilter: filter,
      },
    },
  );

  return (data?.meSellerItems || []).length;
};
