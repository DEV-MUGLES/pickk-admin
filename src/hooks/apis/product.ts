import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateProductArgs} from '@pickk/common';

export const useUpdateProduct = () =>
  useMutation<Pick<Mutation, 'updateProduct'>, MutationUpdateProductArgs>(
    gql`
      mutation UpdateProduct(
        $id: Int!
        $updateProductInput: UpdateProductInput!
      ) {
        updateProduct(id: $id, updateProductInput: $updateProductInput) {
          id
          stock
        }
      }
    `,
  );
