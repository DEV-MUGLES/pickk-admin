import {ApolloCache, gql, MutationUpdaterFn, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationActivateItemPriceArgs,
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
        ...ItemPriceFragment
      }
    }
    ${ITEM_PRICE_FRAGMENT}
  `);

  const updateCache =
    (itemId: number): MutationUpdaterFn =>
    (cache: ApolloCache<unknown>, {data: {addItemPrice}}) => {
      cache.modify({
        id: `Item:${itemId}`,
        fields: {
          prices(existingPricesRefs) {
            const newPriceRef = cache.writeFragment({
              data: addItemPrice,
              fragment: ITEM_PRICE_FRAGMENT,
            });

            return [...existingPricesRefs, newPriceRef];
          },
        },
      });
    };

  return {addItemPrice, updateCache};
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
        ...ItemPriceFragment
      }
    }
    ${ITEM_PRICE_FRAGMENT}
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