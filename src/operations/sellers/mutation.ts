import {gql} from '@apollo/client';

export const CREATE_SELLER_MUTATION = gql`
  mutation CreateSeller($createSellerInput: CreateSellerInput!) {
    createSeller(createSellerInput: $createSellerInput) {
      id
    }
  }
`;

export const UPDATE_ME_SELLER_MUTATION = gql`
  mutation UpdateMeSeller($updateSellerInput: UpdateSellerInput!) {
    updateMeSeller(updateSellerInput: $updateSellerInput) {
      id
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
  mutation UpdateMySellerClaimPolicy(
    $updateSellerClaimPolicyInput: UpdateSellerClaimPolicyInput!
  ) {
    updateMySellerClaimPolicy(
      updateSellerClaimPolicyInput: $updateSellerClaimPolicyInput
    ) {
      id
    }
  }
`;

export const UPDATE_MY_SELLER_CRAWL_POLICY_MUTATION = gql`
  mutation UpdateMySellerCrawlPolicy(
    $updateSellerCrawlPolicyInput: UpdateSellerCrawlPolicyInput!
  ) {
    updateMySellerCrawlPolicy(
      updateSellerCrawlPolicyInput: $updateSellerCrawlPolicyInput
    ) {
      id
    }
  }
`;

export const UPDATE_MY_SELLER_RETURN_ADDRESS_MUTATION = gql`
  mutation UpdateMySellerReturnAddress(
    $updateSellerReturnAddressInput: UpdateSellerReturnAddressInput!
  ) {
    updateMySellerReturnAddress(
      updateSellerReturnAddressInput: $updateSellerReturnAddressInput
    ) {
      id
    }
  }
`;

export const UPDATE_MY_SELLER_SHIPPING_POLICY_MUTATION = gql`
  mutation UpdateMySellerShippingPolicy(
    $updateSellerShippingPolicyInput: UpdateSellerShippingPolicyInput!
  ) {
    updateMySellerShippingPolicy(
      updateSellerShippingPolicyInput: $updateSellerShippingPolicyInput
    ) {
      id
    }
  }
`;

export const UPDATEE_MY_SELLER_SETTLE_POLICY_MUTATION = gql`
  mutation UpdateMySellerSettlePolicy(
    $updateSellerSettlePolicyInput: UpdateSellerSettlePolicyInput!
  ) {
    updateMySellerSettlePolicy(
      updateSellerSettlePolicyInput: $updateSellerSettlePolicyInput
    ) {
      id
    }
  }
`;
