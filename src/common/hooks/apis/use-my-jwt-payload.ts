import {gql, useQuery} from '@apollo/client';
import {Query} from '@pickk/common';

const GET_MY_JWT_PAYLOAD = gql`
  query myJwtPayload {
    myJwtPayload {
      brandId
      brandNameKor
      nickname
      sellerId
    }
  }
`;

export const useMyJwtPayload = () => {
  const {data} = useQuery<Pick<Query, 'myJwtPayload'>>(GET_MY_JWT_PAYLOAD);

  return {data: data?.myJwtPayload};
};
