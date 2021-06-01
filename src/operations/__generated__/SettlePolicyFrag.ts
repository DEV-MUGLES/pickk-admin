/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InicisBankCode } from "./globalTypes";

// ====================================================
// GraphQL fragment: SettlePolicyFrag
// ====================================================

export interface SettlePolicyFrag_account {
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

export interface SettlePolicyFrag {
  __typename: "SellerSettlePolicy";
  account: SettlePolicyFrag_account;
  createdAt: any;
  /**
   * 세금계산서 수령이메일
   */
  email: string;
  id: number;
  /**
   * 담당자 번호
   */
  phoneNumber: string;
  picName: string;
  updatedAt: any;
}
