import {gql} from '@apollo/client';

export const LOGIN_BY_CODE = gql`
  query LoginByCode($loginByCodeInput: LoginByCodeInput!) {
    loginByCode(loginByCodeInput: $loginByCodeInput) {
      access
      refresh
    }
  }
`;
