import {Query, QueryLoginByCodeArgs, useImperativeQuery} from '@pickk/common';

import {LOGIN_BY_CODE} from '@src/common/graphql';

export const useLoginByCode = () =>
  useImperativeQuery<Pick<Query, 'loginByCode'>, QueryLoginByCodeArgs>(
    LOGIN_BY_CODE,
  );
