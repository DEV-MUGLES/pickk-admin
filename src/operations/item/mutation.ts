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

export const ADD_ITEM_NOTICE_MUTATION: OperationType = {
  gql: gql`
    mutation AddItemNotice(
      $itemId: Int!
      $addItemNoticeInput: AddItemNoticeInput!
    ) {
      addItemNotice(itemId: $itemId, addItemNoticeInput: $addItemNoticeInput) {
        id
      }
    }
  `,
  dataName: 'addItemNotice',
};

export const UPDATE_ITEM_NOTICE_MUTATION: OperationType = {
  gql: gql`
    mutation UpdateItemNotice(
      $itemId: Int!
      $updateItemNoticeInput: UpdateItemNoticeInput!
    ) {
      updateItemNotice(
        itemId: $itemId
        updateItemNoticeInput: $updateItemNoticeInput
      ) {
        id
      }
    }
  `,
  dataName: 'updateItemNotice',
};

export const REMOVE_ITEM_NOTICE_MUTATION: OperationType = {
  gql: gql`
    mutation RemoveItemNotice($itemId: Int!) {
      removeItemNotice(itemId: $itemId) {
        id
      }
    }
  `,
  dataName: 'removeItemNotice',
};
