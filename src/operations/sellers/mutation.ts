import {gql} from '@apollo/client';
import {
  BASE_SELLER_FRAG,
  SELLER_CLAIM_POLICY_FRAG,
  SELLER_CRAWL_POLICY_FRAG,
  SELLER_RETURN_ADDRESS_FRAG,
  SELLER_SETTLE_POLICY_FRAG,
  SELLER_SHIPPING_POLICY_FRAG,
} from './fragment';

export const CREATE_SELLER_MUTATION = gql`
  ${BASE_SELLER_FRAG}
  mutation CreateSeller($createSellerInput: CreateSellerInput!) {
    createSeller(createSellerInput: $createSellerInput) {
      ...BaseSellerFrag
    }
  }
`;

export const UPDATE_ME_SELLER_MUTATION = gql`
  ${BASE_SELLER_FRAG}
  mutation UpdateMeSeller($updateSellerInput: UpdateSellerInput!) {
    updateMeSeller(updateSellerInput: $updateSellerInput) {
      ...BaseSellerFrag
    }
  }
`;

export const UPDATE_SELLER_SALE_STRATEGY = gql`
  mutation UpdateSellerSaleStrategy(
    $sellerId: Int!
    $updateSaleStrategyInput: FindSaleStrategyInput!
  ) {
    updateSellerSaleStrategy(
      sellerId: $sellerId
      updateSaleStrategyInput: $updateSaleStrategyInput
    ) {
      id
    }
  }
`;

export const UPDATE_MY_SELLER_CLAIM_POLICY_MUTATION = gql`
  ${SELLER_CLAIM_POLICY_FRAG}
  mutation UpdateMySellerClaimPolicy(
    $updateSellerClaimPolicyInput: UpdateSellerClaimPolicyInput!
  ) {
    updateMySellerClaimPolicy(
      updateSellerClaimPolicyInput: $updateSellerClaimPolicyInput
    ) {
      ...SellerClaimPolicyFrag
    }
  }
`;

export const UPDATE_MY_SELLER_CRAWL_POLICY_MUTATION = gql`
  ${SELLER_CRAWL_POLICY_FRAG}
  mutation UpdateMySellerCrawlPolicy(
    $updateSellerCrawlPolicyInput: UpdateSellerCrawlPolicyInput!
  ) {
    updateMySellerCrawlPolicy(
      updateSellerCrawlPolicyInput: $updateSellerCrawlPolicyInput
    ) {
      ...SellerCrawlPolicyFrag
    }
  }
`;

export const UPDATE_MY_SELLER_RETURN_ADDRESS_MUTATION = gql`
  ${SELLER_RETURN_ADDRESS_FRAG}
  mutation UpdateMySellerReturnAddress(
    $updateSellerReturnAddressInput: UpdateSellerReturnAddressInput!
  ) {
    updateMySellerReturnAddress(
      updateSellerReturnAddressInput: $updateSellerReturnAddressInput
    ) {
      ...SellerReturnAddressFrag
    }
  }
`;

export const UPDATE_MY_SELLER_SHIPPING_POLICY_MUTATION = gql`
  ${SELLER_SHIPPING_POLICY_FRAG}
  mutation UpdateMySellerShippingPolicy(
    $updateSellerShippingPolicyInput: UpdateSellerShippingPolicyInput!
  ) {
    updateMySellerShippingPolicy(
      updateSellerShippingPolicyInput: $updateSellerShippingPolicyInput
    ) {
      ...SellerShippingPolicyFrag
    }
  }
`;

export const UPDATEE_MY_SELLER_SETTLE_POLICY_MUTATION = gql`
  ${SELLER_SETTLE_POLICY_FRAG}
  mutation UpdateMySellerSettlePolicy(
    $updateSellerSettlePolicyInput: UpdateSellerSettlePolicyInput!
  ) {
    updateMySellerSettlePolicy(
      updateSellerSettlePolicyInput: $updateSellerSettlePolicyInput
    ) {
      ...SellerSettlePolicyFrag
    }
  }
`;
