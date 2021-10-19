import {gql, useQuery} from '@apollo/client';
import {
  Query,
  QueryMeSellerRefundRequestsArgs,
  RefundRequestFilter,
} from '@pickk/common';

export const useRefundRequestsCount = ({
  filter,
}: {
  filter: RefundRequestFilter;
}) => {
  const {data} = useQuery<
    Pick<Query, 'meSellerRefundRequests'>,
    QueryMeSellerRefundRequestsArgs
  >(
    gql`
      query MeSellerRefundRequests($refundRequestFilter: RefundRequestFilter) {
        meSellerRefundRequests(refundRequestFilter: $refundRequestFilter) {
          merchantUid
        }
      }
    `,
    {
      variables: {
        refundRequestFilter: filter,
      },
    },
  );

  return (data?.meSellerRefundRequests || []).length;
};
