import {gql} from '@apollo/client';
import {Query, QueryLoginByCodeArgs, useImperativeQuery} from '@pickk/common';

export const useLoginByCode = () =>
  useImperativeQuery<Pick<Query, 'loginByCode'>, QueryLoginByCodeArgs>(
    gql`
      query LoginByCode($loginByCodeInput: LoginByCodeInput!) {
        loginByCode(loginByCodeInput: $loginByCodeInput) {
          access
          refresh
        }
      }
    `,
  );
