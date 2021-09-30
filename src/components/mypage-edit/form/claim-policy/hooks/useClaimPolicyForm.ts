import {gql, useQuery} from '@apollo/client';
import {SellerReturnAddress, SellerClaimPolicy, Query} from '@pickk/common';

export const SELLER_RETURN_ADDRESS_FRAGMENT = gql`
  fragment SellerReturnAddressFragment on SellerReturnAddress {
    id
    baseAddress
    detailAddress
    postalCode
  }
`;

export const SELLER_CLAIM_POLICY_FRAGMENT = gql`
  fragment SellerClaimPolicyFragment on SellerClaimPolicy {
    id
    picName
    phoneNumber
    fee
  }
`;

const GET_ME_SELLER_CLAIM_POLICY = gql`
  query MeSeller {
    meSeller {
      id
      returnAddress {
        ...SellerReturnAddressFragment
      }
      claimPolicy {
        ...SellerClaimPolicyFragment
      }
    }
  }
  ${SELLER_RETURN_ADDRESS_FRAGMENT}
  ${SELLER_CLAIM_POLICY_FRAGMENT}
`;

export type ClaimPolicyFormDefaultValue = {
  returnAddress: Pick<
    SellerReturnAddress,
    'baseAddress' | 'detailAddress' | 'postalCode'
  >;
} & SellerClaimPolicy;

export const useClaimPolicyForm = () => {
  const {data} = useQuery<Pick<Query, 'meSeller'>>(GET_ME_SELLER_CLAIM_POLICY);

  const {
    baseAddress = '',
    detailAddress = '',
    postalCode = '',
  } = data?.meSeller?.returnAddress || {};

  const defaultValue: ClaimPolicyFormDefaultValue = {
    returnAddress: {
      baseAddress,
      detailAddress,
      postalCode,
    },
    ...data?.meSeller?.claimPolicy,
  };

  return {data, defaultValue};
};
