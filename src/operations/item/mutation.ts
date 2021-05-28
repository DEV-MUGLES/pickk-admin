import {gql} from '@apollo/client';

import {OperationType} from '../type';
import {ITEM_OPTION_FARG} from './fragment';

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

/**
 * ITEM_OPTION MUTATIONS
 */

export const CREATE_ITEM_OPTION_SET_MUTATION: OperationType = {
  gql: gql`
    mutation CreateOptionSet(
      $id: Int!
      $createItemOptionSetInput: CreateItemOptionSetInput!
    ) {
      createItemOptionSet(
        id: $id
        createItemOptionSetInput: $createItemOptionSetInput
      ) {
        id
      }
    }
  `,
  dataName: 'createItemOptionSet',
};

export const UPDATE_ITEM_OPTION_MUTATION: OperationType = {
  gql: gql`
    ${ITEM_OPTION_FARG}
    mutation UpdateItemOption(
      $id: Int!
      $updateItemOptionInput: UpdateItemOptionInput!
    ) {
      updateItemOption(id: $id, updateItemOptionInput: $updateItemOptionInput) {
        ...ItemOptionFrag
      }
    }
  `,
  dataName: 'updateItemOption',
};
