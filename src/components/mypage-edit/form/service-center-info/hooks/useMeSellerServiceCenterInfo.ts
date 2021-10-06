import {gql, useQuery} from '@apollo/client';
import {Query} from '@pickk/common';

const GET_ME_SELLER_SERVICE_CENTER_INFO = gql`
  query MeSeller {
    meSeller {
      id
      phoneNumber
      operationTimeMessage
      kakaoTalkCode
    }
  }
`;

export const useMeSellerServiceCenterInfo = () =>
  useQuery<Pick<Query, 'meSeller'>>(GET_ME_SELLER_SERVICE_CENTER_INFO);
