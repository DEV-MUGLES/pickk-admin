import {gql, useQuery} from '@apollo/client';
import {Seller} from '@pickk/common';

export const useMeSellerClaimPolicyFee = () => {
  const {data} = useQuery<{
    meSeller: Pick<Seller, 'id' | 'claimPolicy'>;
  }>(gql`
    query MeSeller {
      meSeller {
        id
        claimPolicy {
          id
          fee
        }
      }
    }
  `);

  return {
    claimPolicyFee: data?.meSeller?.claimPolicy?.fee,
  };
};
