import {gql, useQuery} from '@apollo/client';

import {SELLER_SHIPPING_POLICY_FRAG} from '@src/operations/sellers/fragment';
import {MeSeller_meSeller} from '@src/operations/__generated__/MeSeller';

const ME_SELLER_SHIPPING_POLICY_QUERY = gql`
  ${SELLER_SHIPPING_POLICY_FRAG}
  query MeSeller {
    meSeller {
      shippingPolicy {
        ...SellerShippingPolicyFrag
      }
    }
  }
`;

export const useShippingPolicyEdit = () => {
  const {data} = useQuery<{
    meSeller: Pick<MeSeller_meSeller, 'shippingPolicy'>;
  }>(ME_SELLER_SHIPPING_POLICY_QUERY);
  const {fee = 0, minimumAmountForFree = 0} = data?.meSeller?.shippingPolicy;
  const defaultValue = {
    shippingPolicy: {
      fee,
      minimumAmountForFree,
    },
  };

  return {data, defaultValue};
};
