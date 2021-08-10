import {ApolloClient, gql} from '@apollo/client';
import {ErrorResponse} from '@apollo/client/link/error';
import {Query} from '@pickk/common';

import {setCookie} from '@src/common/helpers';

const GET_REFRESH_JWT_TOKEN = gql`
  query RefreshJwtToken {
    refreshJwtToken {
      access
      refresh
    }
  }
`;

const getNewAccessToken = async (apolloClient: ApolloClient<unknown>) => {
  const {data} = await apolloClient.query<Pick<Query, 'refreshJwtToken'>>({
    query: GET_REFRESH_JWT_TOKEN,
  });
  return data.refreshJwtToken.access;
};

export const handleUnauthorizedError = async (
  apolloClient: ApolloClient<unknown>,
  {operation, forward}: ErrorResponse,
) => {
  try {
    const newAccessToken = await getNewAccessToken(apolloClient);
    setCookie('accessToken', newAccessToken);
    operation.setContext({
      headers: {
        Authorization: newAccessToken ? `Bearer ${newAccessToken}` : null,
      },
    });
    forward(operation);
  } catch (error) {
    alert('세션 연결이 끊어졌습니다. 다시 로그인하십시오.');
    window.location.href = '/login';
  }
};
