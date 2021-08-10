import {
  Query,
  QueryLoginSellerByCodeArgs,
  useImperativeQuery,
} from '@pickk/common';

import {LOGIN_SELLER_BY_CODE} from '@src/common/graphql';

export const useLoginSellerByCode = () =>
  useImperativeQuery<
    Pick<Query, 'loginSellerByCode'>,
    QueryLoginSellerByCodeArgs
  >(LOGIN_SELLER_BY_CODE);
