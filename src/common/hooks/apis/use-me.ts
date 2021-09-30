import {gql, useQuery} from '@apollo/client';
import {User} from '@pickk/common';

const GET_ME = gql`
  query me {
    me {
      id
      name
      nickname
      role
    }
  }
`;

type MeDataType = Pick<User, 'id' | 'name' | 'nickname' | 'role'>;

export const useMe = () => {
  const {data, client} = useQuery<{me: MeDataType}>(GET_ME, {
    nextFetchPolicy: 'network-only',
  });

  return {data: data?.me, reset: client.resetStore};
};
