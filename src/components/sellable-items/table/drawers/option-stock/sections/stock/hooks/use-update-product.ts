import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateMeSellerProductArgs} from '@pickk/common';

export const useUpdateProduct = () => {
  const [update] = useMutation<
    Pick<Mutation, 'updateMeSellerProduct'>,
    MutationUpdateMeSellerProductArgs
  >(
    gql`
      mutation updateMeSellerProduct($id: Int!, $input: UpdateProductInput!) {
        updateMeSellerProduct(id: $id, input: $input) {
          id
          stock
        }
      }
    `,
  );

  const updateProduct = async (id: number, stock: number) => {
    await update({
      variables: {
        id,
        input: {
          stock,
        },
      },
    });
  };

  return {updateProduct};
};
