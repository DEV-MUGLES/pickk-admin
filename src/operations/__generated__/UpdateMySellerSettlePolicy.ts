/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSellerSettlePolicyInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMySellerSettlePolicy
// ====================================================

export interface UpdateMySellerSettlePolicy_updateMySellerSettlePolicy {
  __typename: "SellerSettlePolicy";
  id: number;
}

export interface UpdateMySellerSettlePolicy {
  /**
   * 추가도 이거로 해주시면 됩니다!
   */
  updateMySellerSettlePolicy: UpdateMySellerSettlePolicy_updateMySellerSettlePolicy;
}

export interface UpdateMySellerSettlePolicyVariables {
  updateSellerSettlePolicyInput: UpdateSellerSettlePolicyInput;
}
