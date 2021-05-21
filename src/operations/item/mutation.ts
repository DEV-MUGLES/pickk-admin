import {gql} from '@apollo/client';

import {OperationType} from '../type';

export const BULK_UPDATE_ITEMS_MUTATION: OperationType = {
  gql: gql`
    mutation BulkUpdateItems(
      $bulkUpdateItemInput: BulkUpdateItemInput!
      $ids: [Int!]!
    ) {
      bulkUpdateItems(bulkUpdateItemInput: $bulkUpdateItemInput, ids: $ids)
    }
  `,
  dataName: 'bulkUpdateItems',
};

export const UPDATE_ITEM_MUTATION: OperationType = {
  gql: gql`
    mutation UpdateItem($itemId: Int!, $updateItemInput: UpdateItemInput!) {
      updateItem(itemId: $itemId, updateItemInput: $updateItemInput) {
        id
      }
    }
  `,
  dataName: 'updateItem',
};
