import {gql} from '@apollo/client';

export const SELLER_CLAIM_ACCOUNT_FRAG = gql`
  fragment SellerClaimAccountFrag on SellerClaimAccount {
    bankCode
    createdAt
    id
    number
    ownerName
    updatedAt
  }
`;

export const SELLER_CLAIM_POLICY_FRAG = gql`
  ${SELLER_CLAIM_ACCOUNT_FRAG}
  fragment SellerClaimPolicyFrag on SellerClaimPolicy {
    account {
      ...SellerClaimAccountFrag
    }
    createdAt
    fee
    feePayMethod
    id
    phoneNumber
    picName
    updatedAt
  }
`;

export const SELLER_CRAWL_POLICY_FRAG = gql`
  fragment SellerCrawlPolicyFrag on SellerCrawlPolicy {
    createdAt
    id
    isInspectingNew
    isUpdatingItems
    updatedAt
  }
`;

export const SELLER_RETURN_ADDRESS_FRAG = gql`
  fragment SellerReturnAddressFrag on SellerReturnAddress {
    baseAddress
    createdAt
    detailAddress
    id
    postalCode
    updatedAt
  }
`;

export const SALE_STRATEGY_FRAG = gql`
  fragment SaleStrategyFrag on SaleStrategy {
    canUseCoupon
    canUseMileage
    createdAt
    id
    updatedAt
  }
`;

export const SELLER_SETTLE_POLICY_FRAG = gql`
  ${SELLER_CLAIM_ACCOUNT_FRAG}
  fragment SettlePolicyFrag on SellerSettlePolicy {
    account {
      ...SellerClaimAccountFrag
    }
    createdAt
    email
    id
    phoneNumber
    picName
    updatedAt
  }
`;

export const SELLER_SHIPPING_POLICY_FRAG = gql`
  fragment SellerShippingPolicyFrag on SellerShippingPolicy {
    createdAt
    fee
    id
    minimumAmountForFree
    updatedAt
  }
`;

export const BASE_SELLER_FRAG = gql`
  fragment BaseSellerFrag on Seller {
    id
    businessCode
    businessName
    email
    kakaoTalkCode
    mailOrderBusinessCode
    operationTimeMessage
    phoneNumber
    representativeName
    createdAt
    updatedAt
    orderNotiPhoneNumber
    csNotiPhoneNumber
  }
`;

export const SELLER_FRAG = gql`
  ${BASE_SELLER_FRAG}
  ${SELLER_CLAIM_POLICY_FRAG}
  ${SELLER_CRAWL_POLICY_FRAG}
  ${SELLER_RETURN_ADDRESS_FRAG}
  ${SALE_STRATEGY_FRAG}
  ${SELLER_SETTLE_POLICY_FRAG}
  ${SELLER_SHIPPING_POLICY_FRAG}
  fragment SellerFrag on Seller {
    ...BaseSellerFrag
    brandId
    claimPolicy {
      ...SellerClaimPolicyFrag
    }
    courierId
    crawlPolicy {
      ...SellerCrawlPolicyFrag
    }
    returnAddress {
      ...SellerReturnAddressFrag
    }
    saleStrategy {
      ...SaleStrategyFrag
    }
    settlePolicy {
      ...SettlePolicyFrag
    }
    shippingPolicy {
      ...SellerShippingPolicyFrag
    }
    userId
  }
`;
