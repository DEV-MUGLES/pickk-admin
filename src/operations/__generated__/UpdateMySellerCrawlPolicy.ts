/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSellerCrawlPolicyInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMySellerCrawlPolicy
// ====================================================

export interface UpdateMySellerCrawlPolicy_updateMySellerCrawlPolicy {
  __typename: "SellerCrawlPolicy";
  createdAt: any;
  id: number;
  isInspectingNew: boolean;
  isUpdatingItems: boolean;
  updatedAt: any;
}

export interface UpdateMySellerCrawlPolicy {
  updateMySellerCrawlPolicy: UpdateMySellerCrawlPolicy_updateMySellerCrawlPolicy;
}

export interface UpdateMySellerCrawlPolicyVariables {
  updateSellerCrawlPolicyInput: UpdateSellerCrawlPolicyInput;
}
