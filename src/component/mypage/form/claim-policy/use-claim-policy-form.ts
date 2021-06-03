import {gql, useQuery} from '@apollo/client';

import {ClaimFeePayMethod} from '@src/operations/__generated__/globalTypes';
import {SellerClaimAccountFrag} from '@src/operations/__generated__/SellerClaimAccountFrag';
import {SellerClaimPolicyFrag} from '@src/operations/__generated__/SellerClaimPolicyFrag';
import {SellerFrag} from '@src/operations/__generated__/SellerFrag';
import {SellerReturnAddressFrag} from '@src/operations/__generated__/SellerReturnAddressFrag';

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

export type ClaimPolicyFormDefaultValue = {
  returnAddress: Pick<
    SellerReturnAddressFrag,
    'baseAddress' | 'detailAddress' | 'postalCode'
  >;
  feePayReceive: {
    feePayMethod: ClaimFeePayMethod;
    accountInput: Pick<
      SellerClaimAccountFrag,
      'bankCode' | 'number' | 'ownerName'
    >;
  };
} & SellerClaimPolicyFrag;

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
    bankCode,
    number = '',
    ownerName = '',
  } = data?.meSeller?.claimPolicy?.account;

  const defaultValue: ClaimPolicyFormDefaultValue = {
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
