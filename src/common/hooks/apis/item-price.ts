import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateItemPriceArgs} from '@pickk/common';

export const useUpdateItemPrice = () =>
  useMutation<
    Pick<Mutation, 'updateItemPrice'>,
    MutationUpdateItemPriceArgs
  >(gql`
    mutation UpdateItemPrice(
      $id: Int!
      $updateItemPriceInput: UpdateItemPriceInput!
    ) {
      updateItemPrice(id: $id, updateItemPriceInput: $updateItemPriceInput) {
        id
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
  `);
