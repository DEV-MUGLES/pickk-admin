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

/**
 * ITEM_NOTICE MUTATIONS
 */

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

/**
 * ITEM_PRICE MUTATIONS
 */

export const ADD_ITEM_PRICE_MUTATION: OperationType = {
  gql: gql`
    mutation AddItemPrice(
      $itemId: Int!
      $addItemPriceInput: AddItemPriceInput!
    ) {
      addItemPrice(itemId: $itemId, addItemPriceInput: $addItemPriceInput) {
        id
      }
    }
  `,
  dataName: 'addItemPrice',
};

export const UPDATE_ITEM_PRICE_MUTATION: OperationType = {
  gql: gql`
    mutation UpdateItemPrice(
      $id: Int!
      $updateItemPriceInput: UpdateItemPriceInput!
    ) {
      updateItemPrice(id: $id, updateItemPriceInput: $updateItemPriceInput) {
        id
      }
    }
  `,
  dataName: 'updateItemPrice',
};

export const REMOVE_ITEM_PRICE_MUTATION: OperationType = {
  gql: gql`
    mutation RemoveItemPrice($itemId: Int!, $priceId: Int!) {
      removeItemPrice(itemId: $itemId, priceId: $priceId) {
        id
      }
    }
  `,
  dataName: 'removeItemPrice',
};

export const ACTIVATE_ITEM_PRICE_MUTATION: OperationType = {
  gql: gql`
    mutation ActivateItemPrice($itemId: Int!, $priceId: Int!) {
      activateItemPrice(itemId: $itemId, priceId: $priceId) {
        id
      }
    }
  `,
  dataName: 'activateItemPrice',
};
