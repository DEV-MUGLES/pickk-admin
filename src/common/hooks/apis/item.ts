import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationBulkUpdateItemsArgs} from '@pickk/common';

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
