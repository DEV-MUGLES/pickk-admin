import {gql, useMutation} from '@apollo/client';
import {Mutation} from '@pickk/common';

const BULK_UPDATE_IS_SELLABLE = gql`
  mutation bulkUpdateMeSellerItems($ids: [Int!]!, $isSellable: Boolean) {
    bulkUpdateMeSellerItems(ids: $ids, input: {isSellable: $isSellable})
  }
`;

export const useBulkUpdateIsSellable = () => {
  const [bulkUpdate] = useMutation<
    Pick<Mutation, 'bulkUpdateMeSellerItems'>,
    {ids: number[]; isSellable: boolean}
  >(BULK_UPDATE_IS_SELLABLE);

  const bulkUpdateIsSellable = async (ids: number[], isSellable: boolean) => {
    await bulkUpdate({
      variables: {
        ids,
        isSellable,
      },
    });
  };

  return {bulkUpdateIsSellable};
};
