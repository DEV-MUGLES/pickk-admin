import {gql} from '@apollo/client';

import {ITEM_OPTION_FARG} from './fragment';

export const BULK_UPDATE_ITEMS_MUTATION = gql`
  mutation BulkUpdateItems(
    $bulkUpdateItemInput: BulkUpdateItemInput!
    $ids: [Int!]!
  ) {
    bulkUpdateItems(bulkUpdateItemInput: $bulkUpdateItemInput, ids: $ids)
  }
`;

/**
 * ITEM_OPTION MUTATIONS
 */

export const CREATE_ITEM_OPTION_SET_MUTATION = gql`
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
`;

export const UPDATE_ITEM_OPTION_MUTATION = gql`
  ${ITEM_OPTION_FARG}
  mutation UpdateItemOption(
    $id: Int!
    $updateItemOptionInput: UpdateItemOptionInput!
  ) {
    updateItemOption(id: $id, updateItemOptionInput: $updateItemOptionInput) {
      ...ItemOptionFrag
    }
  }
`;

/**
 * PRODUCT MUTATIONS
 */

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: Int!, $updateProductInput: UpdateProductInput!) {
    updateProduct(id: $id, updateProductInput: $updateProductInput) {
      id
    }
  }
`;
