/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSellerClaimPolicyInput, InicisBankCode, ClaimFeePayMethod } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMySellerClaimPolicy
// ====================================================

export interface UpdateMySellerClaimPolicy_updateMySellerClaimPolicy_account {
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

export interface UpdateMySellerClaimPolicy_updateMySellerClaimPolicy {
  __typename: "SellerClaimPolicy";
  account: UpdateMySellerClaimPolicy_updateMySellerClaimPolicy_account | null;
  createdAt: any;
  fee: number;
  feePayMethod: ClaimFeePayMethod;
  id: number;
  /**
   * 담당자 번호
   */
  phoneNumber: string;
  /**
   * 담당자 이름
   */
  picName: string;
  updatedAt: any;
}

export interface UpdateMySellerClaimPolicy {
  updateMySellerClaimPolicy: UpdateMySellerClaimPolicy_updateMySellerClaimPolicy;
}

export interface UpdateMySellerClaimPolicyVariables {
  updateSellerClaimPolicyInput: UpdateSellerClaimPolicyInput;
}
