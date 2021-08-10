import {gql} from '@apollo/client';

export const LOGIN_SELLER_BY_CODE = gql`
  query loginSellerByCode($loginByCodeInput: LoginByCodeInput!) {
    loginSellerByCode(loginByCodeInput: $loginByCodeInput) {
      access
      refresh
    }
  }
`;
