/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InicisBankCode, ClaimFeePayMethod } from "./globalTypes";

// ====================================================
// GraphQL query operation: Seller
// ====================================================

export interface Seller_seller_claimPolicy_account {
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

export interface Seller_seller_claimPolicy {
  __typename: "SellerClaimPolicy";
  account: Seller_seller_claimPolicy_account | null;
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

export interface Seller_seller_crawlPolicy {
  __typename: "SellerCrawlPolicy";
  createdAt: any;
  id: number;
  isInspectingNew: boolean;
  isUpdatingItems: boolean;
  updatedAt: any;
}

export interface Seller_seller_returnAddress {
  __typename: "SellerReturnAddress";
  baseAddress: string;
  createdAt: any;
  detailAddress: string;
  id: number;
  postalCode: string;
  updatedAt: any;
}

export interface Seller_seller_saleStrategy {
  __typename: "SaleStrategy";
  canUseCoupon: boolean;
  canUseMileage: boolean;
  createdAt: any;
  id: number;
  updatedAt: any;
}

export interface Seller_seller_settlePolicy_account {
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

export interface Seller_seller_settlePolicy {
  __typename: "SellerSettlePolicy";
  account: Seller_seller_settlePolicy_account;
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

export interface Seller_seller_shippingPolicy {
  __typename: "SellerShippingPolicy";
  createdAt: any;
  fee: number;
  id: number;
  minimumAmountForFree: number;
  updatedAt: any;
}

export interface Seller_seller {
  __typename: "Seller";
  id: number;
  businessCode: string;
  businessName: string;
  email: string;
  kakaoTalkCode: string | null;
  mailOrderBusinessCode: string;
  operationTimeMessage: string;
  phoneNumber: string;
  representativeName: string;
  createdAt: any;
  updatedAt: any;
  orderNotiPhoneNumber: string | null;
  csNotiPhoneNumber: string | null;
  brandId: number | null;
  claimPolicy: Seller_seller_claimPolicy;
  courierId: number | null;
  crawlPolicy: Seller_seller_crawlPolicy;
  returnAddress: Seller_seller_returnAddress;
  saleStrategy: Seller_seller_saleStrategy;
  settlePolicy: Seller_seller_settlePolicy | null;
  shippingPolicy: Seller_seller_shippingPolicy;
  userId: number | null;
}

export interface Seller {
  seller: Seller_seller;
}

export interface SellerVariables {
  id: number;
}
