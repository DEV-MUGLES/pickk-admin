import {gql, useQuery} from '@apollo/client';
import {QueryMeSellerItemsArgs, ItemFilter} from '@pickk/common';

export const useItemsCount = ({filter}: {filter: ItemFilter}) => {
  const {data} = useQuery<{meSellerItemsCount: number}, QueryMeSellerItemsArgs>(
    gql`
      query meSellerItemsCount($itemFilter: ItemFilter) {
        meSellerItemsCount(itemFilter: $itemFilter)
      }
    `,
    {
      variables: {
        itemFilter: filter,
      },
    },
  );

  return data?.meSellerItemsCount;
};
