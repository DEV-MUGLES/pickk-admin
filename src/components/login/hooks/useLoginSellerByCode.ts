import {gql} from '@apollo/client';
import {
  Query,
  QueryLoginSellerByCodeArgs,
  useImperativeQuery,
  UserRole,
} from '@pickk/common';

export const LOGIN_SELLER_BY_CODE = gql`
  query loginSellerByCode($loginByCodeInput: LoginByCodeInput!) {
    loginSellerByCode(loginByCodeInput: $loginByCodeInput) {
      access
      refresh
    }
  }
`;

export const useLoginSellerByCode = () => {
  const {callQuery: login} = useImperativeQuery<
    Pick<Query, 'loginSellerByCode'>,
    QueryLoginSellerByCodeArgs
  >(LOGIN_SELLER_BY_CODE);

  const loginSellerByCode = async (code: string, password: string) => {
    return await login({
      loginByCodeInput: {
        code,
        password,
        minRole: UserRole.Seller,
      },
    });
  };

  return {loginSellerByCode};
};
