import {gql, useQuery} from '@apollo/client';
import {Query} from '@pickk/common';

import {SELLER_SETTLE_POLICY_FRAGMENT} from '@src/common/graphql';

const GET_ME_SELLER_SETTLE_POLICY = gql`
  query MeSeller {
    meSeller {
      id
      settlePolicy {
        ...SellerSettlePolicyFragment
      }
    }
  }
  ${SELLER_SETTLE_POLICY_FRAGMENT}
`;

export const useSettlePolicyForm = () => {
  const {data} = useQuery<Pick<Query, 'meSeller'>>(GET_ME_SELLER_SETTLE_POLICY);

  const defaultValue = {
    ...data?.meSeller?.settlePolicy,
    accountInput: data?.meSeller?.settlePolicy?.account,
  };

  return {data, defaultValue};
};
