/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InicisBankCode } from "./globalTypes";

// ====================================================
// GraphQL fragment: SellerClaimAccountFrag
// ====================================================

export interface SellerClaimAccountFrag {
  __typename: "SellerClaimAccount";
  bankCode: InicisBankCode;
  createdAt: any;
  id: number;
  /**
   * 계좌번호입니다.("-" 제외) 최대 14자까지 입력 가능합니다.
   */
  number: string;
  ownerName: string;
  updatedAt: any;
}
