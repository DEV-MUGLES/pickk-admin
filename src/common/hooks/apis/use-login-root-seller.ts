import {gql} from '@apollo/client';
import {JwtToken, useImperativeQuery} from '@pickk/common';

export const LOGIN_ROOT_SELLER = gql`
  query loginRootSeller($input: LoginByCodeInput!, $sellerId: Int!) {
    loginRootSeller(loginByCodeInput: $input, sellerId: $sellerId) {
      access
      refresh
    }
  }
`;

export const useLoginRootSeller = () => {
  const {callQuery: login} = useImperativeQuery<
    {loginRootSeller: JwtToken},
    {input: {code: string; password: string}; sellerId: number}
  >(LOGIN_ROOT_SELLER);

  const loginRootSeller = async (
    code: string,
    password: string,
    sellerId: number,
  ) => {
    return await login({
      input: {
        code,
        password,
      },
      sellerId,
    });
  };

  return {loginRootSeller};
};
