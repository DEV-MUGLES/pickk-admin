import {
  Query,
  QueryLoginSellerByCodeArgs,
  useImperativeQuery,
  UserRole,
} from '@pickk/common';

import {LOGIN_SELLER_BY_CODE} from '@src/common/graphql';

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
