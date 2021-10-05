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
        description
      }
    }
  }
`;

export const useShippingPolicyForm = () => {
  const {data} = useQuery<Pick<Query, 'meSeller'>>(
    GET_ME_SELLER_SHIPPING_POLICY,
  );

  if (!data) {
    return {
      data: {
        shippingPolicy: {
          fee: 0,
          minimumAmountForFree: 0,
          description: '',
        },
      },
    };
  }

  return {data: data?.meSeller};
};
