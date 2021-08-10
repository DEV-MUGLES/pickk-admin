import {gql, useQuery} from '@apollo/client';
import {Query} from '@pickk/common';

const GET_ME_SELLER_SHIPPING_POLICY = gql`
  query MeSeller {
    meSeller {
      id
      shippingPolicy {
        id
        fee
        minimumAmountForFree
      }
    }
  }
`;

export const useShippingPolicyForm = () => {
  const {data} = useQuery<Pick<Query, 'meSeller'>>(
    GET_ME_SELLER_SHIPPING_POLICY,
  );
  const shippingPolicy = data?.meSeller?.shippingPolicy;
  const fee = shippingPolicy?.fee || 0;
  const minimumAmountForFree = shippingPolicy?.minimumAmountForFree || 0;
  const defaultValue = {
    shippingPolicy: {
      fee,
      minimumAmountForFree,
    },
  };

  return {data, defaultValue};
};
