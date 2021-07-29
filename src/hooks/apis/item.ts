import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationActivateItemPriceArgs,
  MutationAddItemPriceArgs,
  MutationRemoveItemPriceArgs,
  MutationUpdateItemPriceArgs,
} from '@pickk/common';

export const useAddItemPrice = () =>
  useMutation<Pick<Mutation, 'addItemPrice'>, MutationAddItemPriceArgs>(gql`
    mutation AddItemPrice(
      $itemId: Int!
      $addItemPriceInput: AddItemPriceInput!
    ) {
      addItemPrice(itemId: $itemId, addItemPriceInput: $addItemPriceInput) {
        id
      }
    }
  `);

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
      }
    }
  `);

export const useActivateItemPrice = () =>
  useMutation<
    Pick<Mutation, 'activateItemPrice'>,
    MutationActivateItemPriceArgs
  >(gql`
    mutation ActivateItemPrice($itemId: Int!, $priceId: Int!) {
      activateItemPrice(itemId: $itemId, priceId: $priceId) {
        id
      }
    }
  `);

export const useRemoveItemPrice = () =>
  useMutation<
    Pick<Mutation, 'removeItemPrice'>,
    MutationRemoveItemPriceArgs
  >(gql`
    mutation RemoveItemPrice($itemId: Int!, $priceId: Int!) {
      removeItemPrice(itemId: $itemId, priceId: $priceId) {
        id
      }
    }
  `);
