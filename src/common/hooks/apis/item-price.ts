import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationAddItemPriceArgs,
  MutationRemoveItemPriceArgs,
  MutationUpdateItemPriceArgs,
} from '@pickk/common';

const ITEM_PRICE_FRAGMENT = gql`
  fragment ItemPriceFragment on ItemPrice {
    id
    startAt
    endAt
    originalPrice
    sellPrice
    isActive
  }
`;

export const useAddItemPrice = () => {
  const [addItemPrice] = useMutation<
    Pick<Mutation, 'addItemPrice'>,
    MutationAddItemPriceArgs
  >(gql`
    mutation AddItemPrice(
      $itemId: Int!
      $addItemPriceInput: AddItemPriceInput!
    ) {
      addItemPrice(itemId: $itemId, addItemPriceInput: $addItemPriceInput) {
        id
        prices {
          ...ItemPriceFragment
        }
      }
    }
    ${ITEM_PRICE_FRAGMENT}
  `);

  return {addItemPrice};
};

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
          ...ItemPriceFragment
        }
      }
    }
    ${ITEM_PRICE_FRAGMENT}
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
