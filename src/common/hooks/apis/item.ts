import {
  ApolloCache,
  gql,
  QueryHookOptions,
  useMutation,
  useQuery,
} from '@apollo/client';
import {
  Mutation,
  MutationBulkUpdateItemsArgs,
  MutationUpdateItemArgs,
  Query,
  QueryItemsArgs,
  UpdateItemInput,
} from '@pickk/common';

import {ITEMS_QUERY} from '@src/common/gqls/item/query';

export const useItems = (options?: QueryHookOptions) =>
  useQuery<Pick<Query, 'items'>, QueryItemsArgs>(ITEMS_QUERY, options);

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

export const useBulkUpdateItems = () =>
  useMutation<
    Pick<Mutation, 'bulkUpdateItems'>,
    MutationBulkUpdateItemsArgs
  >(gql`
    mutation BulkUpdateItems(
      $bulkUpdateItemInput: BulkUpdateItemInput!
      $ids: [Int!]!
    ) {
      bulkUpdateItems(bulkUpdateItemInput: $bulkUpdateItemInput, ids: $ids)
    }
  `);
