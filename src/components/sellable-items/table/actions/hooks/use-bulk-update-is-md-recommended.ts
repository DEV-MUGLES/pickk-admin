import {gql, useMutation} from '@apollo/client';
import {Mutation} from '@pickk/common';

const BULK_UPDATE_IS_MD_RECOMMENDED = gql`
  mutation bulkUpdateMeSellerItems($ids: [Int!]!, $isMdRecommended: Boolean) {
    bulkUpdateMeSellerItems(
      ids: $ids
      input: {isMdRecommended: $isMdRecommended}
    )
  }
`;

export const useBulkUpdateIsMdRecommended = () => {
  const [bulkUpdate] = useMutation<
    Pick<Mutation, 'bulkUpdateMeSellerItems'>,
    {ids: number[]; isMdRecommended: boolean}
  >(BULK_UPDATE_IS_MD_RECOMMENDED);

  const bulkUpdateIsMdRecommended = async (
    ids: number[],
    isMdRecommended: boolean,
  ) => {
    await bulkUpdate({
      variables: {
        ids,
        isMdRecommended,
      },
    });
  };

  return {bulkUpdateIsMdRecommended};
};
