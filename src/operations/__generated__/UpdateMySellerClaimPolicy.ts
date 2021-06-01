/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSellerClaimPolicyInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMySellerClaimPolicy
// ====================================================

export interface UpdateMySellerClaimPolicy_updateMySellerClaimPolicy {
  __typename: "SellerClaimPolicy";
  id: number;
}

export interface UpdateMySellerClaimPolicy {
  updateMySellerClaimPolicy: UpdateMySellerClaimPolicy_updateMySellerClaimPolicy;
}

export interface UpdateMySellerClaimPolicyVariables {
  updateSellerClaimPolicyInput: UpdateSellerClaimPolicyInput;
}
