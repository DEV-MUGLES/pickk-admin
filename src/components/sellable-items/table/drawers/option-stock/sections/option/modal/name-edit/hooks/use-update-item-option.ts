import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateMeSellerItemOptionArgs} from '@pickk/common';

const UPDATE_ITEM_OPTION = gql`
  mutation updateMeSellerItemOption($id: Int!, $input: UpdateItemOptionInput!) {
    updateMeSellerItemOption(id: $id, input: $input) {
      id
      name
      values {
        id
        name
      }
    }
  }
`;

export const useUpdateItemOption = () => {
  const [update] = useMutation<
    Pick<Mutation, 'updateMeSellerItemOption'>,
    MutationUpdateMeSellerItemOptionArgs
  >(UPDATE_ITEM_OPTION);

  const updateItemOption = async (id: number, name: string) => {
    await update({
      variables: {
        id,
        input: {
          name,
        },
      },
    });
  };

  return {updateItemOption};
};
