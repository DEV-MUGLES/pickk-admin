import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationUpdateMeSellerItemArgs,
  UpdateItemInput,
} from '@pickk/common';

const UPDATE_ITEM = gql`
  mutation updateMeSellerItem($id: Int!, $input: UpdateItemInput!) {
    updateMeSellerItem(id: $id, input: $input) {
      id
      name
      imageUrl
      majorCategoryId
      minorCategoryId
      majorCategory {
        id
        name
      }
      minorCategory {
        id
        name
      }
    }
  }
`;

export const useUpdateItem = () => {
  const [update] = useMutation<
    Pick<Mutation, 'updateMeSellerItem'>,
    MutationUpdateMeSellerItemArgs
  >(UPDATE_ITEM);

  const updateItem = async (id: number, input: UpdateItemInput) => {
    await update({
      variables: {
        id,
        input,
      },
    });
  };

  return {updateItem};
};
