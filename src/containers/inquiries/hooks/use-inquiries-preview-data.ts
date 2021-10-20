import {gql, useQuery} from '@apollo/client';
import {Query, QueryMeSellerInquiriesCountArgs} from '@pickk/common';

const GET_ME_SELLER_INQUIRIES_COUNT = gql`
  query meSellerInquiriesCount($forceUpdate: Boolean) {
    meSellerInquiriesCount(forceUpdate: $forceUpdate) {
      id
      delayed
      not_answered
      lastUpdatedAt
    }
  }
`;

export const useInquiriesPreviewData = () => {
  const {data, refetch} = useQuery<
    Pick<Query, 'meSellerInquiriesCount'>,
    QueryMeSellerInquiriesCountArgs
  >(GET_ME_SELLER_INQUIRIES_COUNT);

  return {
    data: data?.meSellerInquiriesCount ?? {},
    reload: () => refetch({forceUpdate: true}),
  };
};
