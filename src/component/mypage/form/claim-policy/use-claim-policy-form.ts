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

  const {
    baseAddress = '',
    detailAddress = '',
    postalCode = '',
  } = data?.meSeller?.returnAddress;

  const {
    bankCode = '',
    number = '',
    ownerName = '',
  } = data?.meSeller?.claimPolicy?.account;

  const defaultValue = {
    returnAddress: {
      baseAddress,
      detailAddress,
      postalCode,
    },
    ...data?.meSeller?.claimPolicy,
    feePayReceive: {
      feePayMethod: data?.meSeller?.claimPolicy?.feePayMethod,
      accountInput: {
        bankCode,
        number,
        ownerName,
      },
    },
  };

  return {data, defaultValue};
};
