import {gql, useMutation, useQuery} from '@apollo/client';
import {Query, Mutation, MutationUpdateMeSellerArgs} from '@pickk/common';

/**
 * Seller Base Info
 */
const SELLER_BASE_INFO_FRAGMENT = gql`
  fragment SellerBaseInfoFragment on Seller {
    id
    businessName
    representativeName
    businessCode
    mailOrderBusinessCode
    email
    orderNotiPhoneNumber
    csNotiPhoneNumber
  }
`;

export const useMeSellerBaseInfo = () =>
  useQuery<Pick<Query, 'meSeller'>>(gql`
    query MeSeller {
      meSeller {
        ...SellerBaseInfoFragment
      }
    }
    ${SELLER_BASE_INFO_FRAGMENT}
  `);

export const useUpdateMeSellerBaseInfo = () =>
  useMutation<Pick<Mutation, 'updateMeSeller'>, MutationUpdateMeSellerArgs>(gql`
    mutation UpdateMeSeller($updateSellerInput: UpdateSellerInput!) {
      updateMeSeller(updateSellerInput: $updateSellerInput) {
        ...SellerBaseInfoFragment
      }
    }
    ${SELLER_BASE_INFO_FRAGMENT}
  `);

/**
 * Seller Service Center Info
 */
const SELLER_SERVICE_CENTER_INFO_FRAGEMTN = gql`
  fragment SellerServiceCenterInfoFragment on Seller {
    id
    phoneNumber
    operationTimeMessage
    kakaoTalkCode
  }
`;

export const useMeSellerServiceCenterInfo = () =>
  useQuery<Pick<Query, 'meSeller'>>(gql`
    query MeSeller {
      meSeller {
        ...SellerServiceCenterInfoFragment
      }
    }
    ${SELLER_SERVICE_CENTER_INFO_FRAGEMTN}
  `);

export const useUpdateMeSellerServiceCenterInfo = () =>
  useMutation<Pick<Mutation, 'updateMeSeller'>, MutationUpdateMeSellerArgs>(gql`
    mutation UpdateMeSeller($updateSellerInput: UpdateSellerInput!) {
      updateMeSeller(updateSellerInput: $updateSellerInput) {
        ...SellerServiceCenterInfoFragment
      }
    }
    ${SELLER_SERVICE_CENTER_INFO_FRAGEMTN}
  `);

/**
 * Seller ShippingPolicy
 */
export const useMeSellerShippingPolicy = () =>
  useQuery<Pick<Query, 'meSeller'>>(gql`
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
  `);

/**
 * Seller ClaimPolicy
 */
export const SELLER_RETURN_ADDRESS_FRAGMENT = gql`
  fragment SellerReturnAddressFragment on SellerReturnAddress {
    id
    baseAddress
    detailAddress
    postalCode
  }
`;

export const SELLER_CLAIM_ACCOUNT_FRAGMENT = gql`
  fragment SellerClaimAccountFragment on SellerClaimAccount {
    id
    bankCode
    number
    ownerName
  }
`;

export const SELLER_CLAIM_POLICY_FRAGMENT = gql`
  fragment SellerClaimPolicyFragment on SellerClaimPolicy {
    id
    picName
    phoneNumber
    fee
    feePayMethod
    account {
      ...SellerClaimAccountFragment
    }
  }
  ${SELLER_CLAIM_ACCOUNT_FRAGMENT}
`;

export const useMeSellerClaimPolicy = () =>
  useQuery<Pick<Query, 'meSeller'>>(gql`
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
  `);

/**
 * Seller SettlePolicy
 */

export const SELLER_SETTLE_POLICY_FRAGMENT = gql`
  fragment SellerSettlePolicyFragment on SellerSettlePolicy {
    id
    picName
    phoneNumber
    email
    account {
      ...SellerClaimAccountFragment
    }
  }
  ${SELLER_CLAIM_ACCOUNT_FRAGMENT}
`;

export const useMeSellerSettlePolicy = () =>
  useQuery<Pick<Query, 'meSeller'>>(gql`
    query MeSeller {
      meSeller {
        id
        settlePolicy {
          ...SellerSettlePolicyFragment
        }
      }
    }
    ${SELLER_SETTLE_POLICY_FRAGMENT}
  `);
