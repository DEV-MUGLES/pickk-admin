/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindSaleStrategyInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSellerSaleStrategy
// ====================================================

export interface UpdateSellerSaleStrategy_updateSellerSaleStrategy {
  __typename: "SaleStrategy";
  id: number;
}

export interface UpdateSellerSaleStrategy {
  /**
   * 입력한 seller의 saleStrategy를 변경합니다. Admin 이상의 권한이 필요합니다.
   */
  updateSellerSaleStrategy: UpdateSellerSaleStrategy_updateSellerSaleStrategy;
}

export interface UpdateSellerSaleStrategyVariables {
  sellerId: number;
  updateSaleStrategyInput: FindSaleStrategyInput;
}
