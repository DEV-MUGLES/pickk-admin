import {
  SellerReturnAddress,
  SellerClaimAccount,
  SellerClaimPolicy,
  BankCode,
  ClaimFeePayMethod,
} from '@pickk/common';

import {useMeSellerClaimPolicy} from '@src/common/hooks/apis';

export type ClaimPolicyFormDefaultValue = {
  returnAddress: Pick<
    SellerReturnAddress,
    'baseAddress' | 'detailAddress' | 'postalCode'
  >;
  feePayReceive: {
    feePayMethod: ClaimFeePayMethod;
    accountInput: Pick<SellerClaimAccount, 'bankCode' | 'number' | 'ownerName'>;
  };
} & SellerClaimPolicy;

export const useClaimPolicyForm = () => {
  const {data} = useMeSellerClaimPolicy();

  const {
    baseAddress = '',
    detailAddress = '',
    postalCode = '',
  } = data?.meSeller?.returnAddress || {};

  const {
    bankCode = BankCode.AbnAmro,
    number = '',
    ownerName = '',
  } = data?.meSeller?.claimPolicy?.account || {};

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
