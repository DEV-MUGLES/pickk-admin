import {gql, useQuery} from '@apollo/client';
import {Query} from '@pickk/common';

const GET_ME_SELLER_SETTLE_POLICY = gql`
  query MeSeller {
    meSeller {
      id
      settlePolicy {
        id
        picName
        phoneNumber
        email
      }
    }
  }
`;

export const useSettlePolicyForm = () => {
  const {data} = useQuery<Pick<Query, 'meSeller'>>(GET_ME_SELLER_SETTLE_POLICY);

  const defaultValue = {
    ...data?.meSeller?.settlePolicy,
    accountInput: data?.meSeller?.settlePolicy?.account,
  };

  return {data, defaultValue};
};
