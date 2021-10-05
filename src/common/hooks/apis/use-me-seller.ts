import {gql, useQuery} from '@apollo/client';
import {Seller, User} from '@pickk/common';

const GET_ME_SELLER = gql`
  query meSeller {
    meSeller {
      id
      user {
        id
        name
        nickname
        role
      }
    }
  }
`;

type MeSellerDataType = Pick<Seller, 'id'> & {
  user: Pick<User, 'id' | 'name' | 'nickname' | 'role'>;
};

export const useMeSeller = () => {
  const {data, client} = useQuery<{meSeller: MeSellerDataType}>(GET_ME_SELLER, {
    nextFetchPolicy: 'network-only',
  });

  return {data: data?.meSeller?.user, reset: client.resetStore};
};
