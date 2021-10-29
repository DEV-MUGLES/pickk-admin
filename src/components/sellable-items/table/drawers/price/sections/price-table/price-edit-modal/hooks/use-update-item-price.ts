import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationUpdateMeSellerItemPriceArgs,
  UpdateItemPriceInput,
} from '@pickk/common';

const UPDATE_ITEM_PRICE = gql`
  mutation updateMeSellerItemPrice($id: Int!, $input: UpdateItemPriceInput!) {
    updateMeSellerItemPrice(id: $id, input: $input) {
      id
      originalPrice
      sellPrice
      finalPrice
      prices {
        id
        startAt
        endAt
        originalPrice
        sellPrice
        isActive
      }
    }
  }
`;

export const useUpdateItemPrice = () => {
  const [update] = useMutation<
    Pick<Mutation, 'updateMeSellerItemPrice'>,
    MutationUpdateMeSellerItemPriceArgs
  >(UPDATE_ITEM_PRICE);

  const updateItemPrice = async (id: number, input: UpdateItemPriceInput) => {
    await update({
      variables: {
        id,
        input,
      },
    });
  };

  return {updateItemPrice};
};
