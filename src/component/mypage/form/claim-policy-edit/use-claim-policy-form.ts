import {gql, useQuery} from '@apollo/client';

import {SellerFrag} from '@src/operations/__generated__/SellerFrag';

const ME_SELLER_CLAIMPOLICY_QUERY = gql`
  query MeSeller {
    meSeller {
      id
      returnAddress {
        baseAddress
        detailAddress
        postalCode
      }
      claimPolicy {
        picName
        phoneNumber
        fee
        feePayMethod
        account {
          bankCode
          number
          ownerName
        }
      }
    }
  }
`;

export type ClaimPolicyFormDefaultValue = {};

export const useClaimPolicyForm = () => {
  const {data} = useQuery<{
    meSeller: Pick<SellerFrag, 'returnAddress' | 'claimPolicy'>;
  }>(ME_SELLER_CLAIMPOLICY_QUERY);

  const defaultValue = {
    returnAddress: data?.meSeller?.returnAddress,
    ...data?.meSeller?.claimPolicy,
    feePayReceive: {
      feePayMethod: data?.meSeller?.claimPolicy?.feePayMethod,
      accountInput: data?.meSeller?.claimPolicy?.account,
    },
  };

  delete defaultValue.id;
  delete defaultValue.returnAddress.id;
  delete defaultValue.returnAddress.__typename;
  delete defaultValue.feePayReceive.accountInput.id;
  delete defaultValue.feePayReceive.accountInput.__typename;

  return {data, defaultValue};
};
