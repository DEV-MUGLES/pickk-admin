import {gql} from '@apollo/client';

export const BULK_UPDATE_ITEMS_MUTATION = gql`
  mutation BulkUpdateItems(
    $bulkUpdateItemInput: BulkUpdateItemInput!
    $ids: [Int!]!
  ) {
    bulkUpdateItems(bulkUpdateItemInput: $bulkUpdateItemInput, ids: $ids)
  }
`;
