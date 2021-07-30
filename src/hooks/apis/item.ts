import {ApolloCache, gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationActivateItemPriceArgs,
  MutationAddItemPriceArgs,
  MutationRemoveItemPriceArgs,
  MutationUpdateItemArgs,
  MutationUpdateItemPriceArgs,
  UpdateItemInput,
} from '@pickk/common';

export const useUpdateItem = () => {
  const [updateItem] = useMutation<unknown, MutationUpdateItemArgs>(gql`
    mutation UpdateItem($itemId: Int!, $updateItemInput: UpdateItemInput!) {
      updateItem(itemId: $itemId, updateItemInput: $updateItemInput) {
        id
        name
        imageUrl
        description
        isInfiniteStock
        majorCategoryId
        majorCategory {
          id
          name
        }
        minorCategoryId
        minorCategory {
          id
          name
        }
      }
    }
  `);

  const updateCategoryCache =
    (itemId: number, updateItemInput: UpdateItemInput) =>
    (cache: ApolloCache<unknown>) => {
      const {majorCategoryId, minorCategoryId} = updateItemInput;
      cache.modify({
        id: `Item:${itemId}`,
        fields: {
          majorCategory: () => ({
            __ref: `ItemCategory:${majorCategoryId}`,
          }),
          minorCategory: () => ({
            __ref: `ItemCategory:${minorCategoryId}`,
          }),
        },
      });
    };

  return {updateItem, updateCategoryCache};
};

/**
 * Item Price
 */

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
