import {gql, useMutation} from '@apollo/client';

const UPDATE_ITEM = gql`
  mutation updateMeSellerItem($id: Int!, $isInfiniteStock: Boolean!) {
    updateMeSellerItem(id: $id, input: {isInfiniteStock: $isInfiniteStock}) {
      id
      isInfiniteStock
    }
  }
`;

export const useToggleIsInfiniteStock = () => {
  const [updateItem] = useMutation<
    unknown,
    {id: number; isInfiniteStock: boolean}
  >(UPDATE_ITEM);

  const toggleIsInfiniteStock = async (
    id: number,
    isInfiniteStock: boolean,
  ) => {
    await updateItem({
      variables: {
        id,
        isInfiniteStock,
      },
    });
  };

  return {toggleIsInfiniteStock};
};
