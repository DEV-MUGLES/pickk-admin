import {gql, useQuery} from '@apollo/client';
import {Seller} from '@pickk/common';

export const useMeSellerShippingFees = () => {
  const {data} = useQuery<{
    meSeller: Pick<Seller, 'id' | 'claimPolicy' | 'shippingPolicy'>;
  }>(gql`
    query MeSeller {
      meSeller {
        id
        claimPolicy {
          id
          fee
        }
        shippingPolicy {
          id
          fee
        }
      }
    }
  `);

  if (!data) {
    return {claimPolicyFee: null, shippingPolicyFee: null};
  }

  return {
    claimPolicyFee: data.meSeller?.claimPolicy?.fee,
    shippingPolicyFee: data.meSeller?.shippingPolicy?.fee,
  };
};
