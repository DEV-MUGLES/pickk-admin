import {gql} from '@apollo/client';

export const SELLER_CLAIM_ACCOUNT_FRAGMENT = gql`
  fragment SellerClaimAccountFragment on SellerClaimAccount {
    id
    bankCode
    number
    ownerName
    createdAt
    updatedAt
  }
`;

export const SELLER_SERVICE_CENTER_INFO_FRAGEMENT = gql`
  fragment SellerServiceCenterInfoFragment on Seller {
    id
    phoneNumber
    operationTimeMessage
    kakaoTalkCode
  }
`;

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
