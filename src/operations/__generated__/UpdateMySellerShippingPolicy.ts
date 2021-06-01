/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSellerShippingPolicyInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMySellerShippingPolicy
// ====================================================

export interface UpdateMySellerShippingPolicy_updateMySellerShippingPolicy {
  __typename: "SellerShippingPolicy";
  id: number;
}

export interface UpdateMySellerShippingPolicy {
  updateMySellerShippingPolicy: UpdateMySellerShippingPolicy_updateMySellerShippingPolicy;
}

export interface UpdateMySellerShippingPolicyVariables {
  updateSellerShippingPolicyInput: UpdateSellerShippingPolicyInput;
}
