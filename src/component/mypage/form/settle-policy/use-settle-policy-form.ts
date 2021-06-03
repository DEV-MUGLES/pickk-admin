import {gql, useQuery} from '@apollo/client';

import {SELLER_SETTLE_POLICY_FRAG} from '@src/operations/sellers/fragment';
import {SellerFrag} from '@src/operations/__generated__/SellerFrag';

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

export const useSettlePolicyForm = () => {
  const {data} = useQuery<{meSeller: Pick<SellerFrag, 'settlePolicy'>}>(
    ME_SELLER_SHIPPING_POLICY_QUERY,
  );

  const defaultValue = {
    ...data?.meSeller?.settlePolicy,
    accountInput: data?.meSeller?.settlePolicy?.account,
  };

  return {data, defaultValue};
};
