import {gql, useQuery} from '@apollo/client';

import {SELLER_SETTLE_POLICY_FRAG} from '@src/operations/sellers/fragment';

const ME_SELLER_SHIPPING_POLICY_QUERY = gql`
  ${SELLER_SETTLE_POLICY_FRAG}
  query MeSeller {
    meSeller {
      settlePolicy {
        ...SellerSettlePolicyFrag
      }
    }
  }
`;

export const useShippingPolicyForm = () => {
  const {data} = useQuery(ME_SELLER_SHIPPING_POLICY_QUERY);
  const defaultValue = {
    ...data?.meSeller?.settlePolicy,
    accountInput: data?.meSeller?.settlePolicy?.account,
  };

  return {data, defaultValue};
};
