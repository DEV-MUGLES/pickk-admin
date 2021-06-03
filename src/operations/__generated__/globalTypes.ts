/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * 교환/반품 배송비 지불 방식. (Trans:계좌입금, Enclose:택배상자 동봉)
 */
export enum ClaimFeePayMethod {
  Enclose = "Enclose",
  Trans = "Trans",
}

/**
 * 은행 코드입니다. KG Inicis와 관련 없는 일반 계좌를 저장할 때도 사용됩니다.
 */
export enum InicisBankCode {
  AbnAmro = "AbnAmro",
  BcCard = "BcCard",
  Boa = "Boa",
  Busan = "Busan",
  ChBank = "ChBank",
  Chohung = "Chohung",
  Citi = "Citi",
  Commercial = "Commercial",
  Cu = "Cu",
  Daegu = "Daegu",
  Deutsche = "Deutsche",
  EPost = "EPost",
  ExShinhan = "ExShinhan",
  Hana = "Hana",
  Hanil = "Hanil",
  Hanmi = "Hanmi",
  Housing = "Housing",
  Hsbc = "Hsbc",
  Ibk = "Ibk",
  Jeju = "Jeju",
  Jeonbuk = "Jeonbuk",
  JpMorgan = "JpMorgan",
  KBank = "KBank",
  KakaoBank = "KakaoBank",
  KakaoMoney = "KakaoMoney",
  Kangwon = "Kangwon",
  Kb = "Kb",
  Kdb = "Kdb",
  Keb = "Keb",
  Kwangju = "Kwangju",
  Kyongnam = "Kyongnam",
  LPoint = "LPoint",
  MitsubishiTokyo = "MitsubishiTokyo",
  MutualSavings = "MutualSavings",
  NaverPoint = "NaverPoint",
  NhBank = "NhBank",
  Nonghyup = "Nonghyup",
  Payco = "Payco",
  Peace = "Peace",
  Sc = "Sc",
  Seoul = "Seoul",
  ShBank = "ShBank",
  Shinan = "Shinan",
  Shinhan = "Shinhan",
  Shinsegae = "Shinsegae",
  Sj = "Sj",
  SsgMoney = "SsgMoney",
  TossMoney = "TossMoney",
  Woori = "Woori",
}

/**
 * 아이템 안내 분류입니다. 기본값은 General입니다.
 */
export enum ItemNoticeType {
  CustomOrder = "CustomOrder",
  DeliveryDelay = "DeliveryDelay",
  General = "General",
  OverseaDelivery = "OverseaDelivery",
  PreorderDelivery = "PreorderDelivery",
}

/**
 * 아이템의 가격 단위입니다. null인 경우 원화로 취급되며, 값을 가질 경우 적절한 displayPrice에 적절한 환율을 곱한 값으로 salePrice를 설정합니다.
 */
export enum ItemPriceUnit {
  AUD = "AUD",
  CAD = "CAD",
  CNY = "CNY",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  KRW = "KRW",
  USD = "USD",
}

export interface AddItemNoticeInput {
  endAt?: any | null;
  message: string;
  startAt?: any | null;
  type?: ItemNoticeType | null;
}

export interface AddItemPriceInput {
  endAt?: any | null;
  isActive?: boolean | null;
  isCrawlUpdating: boolean;
  originalPrice: number;
  pickkDiscountAmount?: number | null;
  pickkDiscountRate?: number | null;
  sellPrice: number;
  startAt?: any | null;
}

export interface BulkUpdateItemInput {
  isMdRecommended?: boolean | null;
  isSellable?: boolean | null;
  majorCategoryId?: number | null;
  minorCategoryId?: number | null;
}

export interface CreateItemOptionInput {
  name: string;
  values: string[];
}

export interface CreateItemOptionSetInput {
  options: CreateItemOptionInput[];
}

export interface CreateSellerClaimAccountInput {
  bankCode: InicisBankCode;
  number: string;
  ownerName: string;
}

export interface CreateSellerClaimPolicyInput {
  accountInput?: CreateSellerClaimAccountInput | null;
  fee: number;
  feePayMethod: ClaimFeePayMethod;
  phoneNumber: string;
  picName: string;
}

export interface CreateSellerCrawlPolicyInput {
  isInspectingNew: boolean;
  isUpdatingItems: boolean;
}

export interface CreateSellerCrawlStrategyInput {
  baseUrl: string;
  codeRegex: string;
  itemsSelector: string;
  pageParam?: string | null;
  pagination: boolean;
  startPathNamesJoin: string;
}

export interface CreateSellerInput {
  brandId: number;
  businessCode: string;
  businessName: string;
  claimPolicyInput: CreateSellerClaimPolicyInput;
  courierId: number;
  crawlPolicyInput: CreateSellerCrawlPolicyInput;
  crawlStrategyInput: CreateSellerCrawlStrategyInput;
  csNotiPhoneNumber?: string | null;
  email: string;
  kakaoTalkCode?: string | null;
  mailOrderBusinessCode: string;
  operationTimeMessage: string;
  orderNotiPhoneNumber?: string | null;
  phoneNumber: string;
  representativeName: string;
  returnAddressInput: CreateSellerReturnAddressInput;
  saleStrategyInput: FindSaleStrategyInput;
  settlePolicyInput?: CreateSellerSettlePolicyInput | null;
  shippingPolicyInput: CreateSellerShippingPolicyInput;
  userId: number;
}

export interface CreateSellerReturnAddressInput {
  baseAddress: string;
  detailAddress: string;
  postalCode: string;
}

export interface CreateSellerSettleAccountInput {
  bankCode: InicisBankCode;
  number: string;
  ownerName: string;
}

export interface CreateSellerSettlePolicyInput {
  accountInput?: CreateSellerSettleAccountInput | null;
  email: string;
  phoneNumber: string;
  picName: string;
}

export interface CreateSellerShippingPolicyInput {
  fee: number;
  minimumAmountForFree: number;
}

export interface FindSaleStrategyInput {
  canUseCoupon: boolean;
  canUseMileage: boolean;
}

export interface ItemFilter {
  brandId?: number | null;
  createdAtLte?: any | null;
  createdAtMte?: any | null;
  isMdRecommended?: boolean | null;
  isPurchasable?: boolean | null;
  isSellable?: boolean | null;
  majorCategoryId?: number | null;
  minorCategoryId?: number | null;
  search?: string | null;
  sellableAtLte?: any | null;
  sellableAtMte?: any | null;
}

export interface PageInput {
  limit?: number | null;
  offset?: number | null;
  startId?: number | null;
}

export interface SellerFilter {
  businessCode?: string | null;
  kakaoTalkCodeIn?: string[] | null;
  search?: string | null;
}

export interface UpdateItemInput {
  description?: string | null;
  imageUrl?: string | null;
  isInfiniteStock?: boolean | null;
  majorCategoryId?: number | null;
  minorCategoryId?: number | null;
  name?: string | null;
}

export interface UpdateItemNoticeInput {
  endAt?: any | null;
  message?: string | null;
  startAt?: any | null;
  type?: ItemNoticeType | null;
}

export interface UpdateItemOptionInput {
  name: string;
}

export interface UpdateItemPriceInput {
  displayPrice?: number | null;
  endAt?: any | null;
  isCrawlUpdating?: boolean | null;
  originalPrice?: number | null;
  pickkDiscountAmount?: number | null;
  pickkDiscountRate?: number | null;
  sellPrice?: number | null;
  startAt?: any | null;
  unit?: ItemPriceUnit | null;
}

export interface UpdateProductInput {
  stock: number;
}

export interface UpdateSellerClaimAccountInput {
  bankCode?: InicisBankCode | null;
  number?: string | null;
  ownerName?: string | null;
}

export interface UpdateSellerClaimPolicyInput {
  accountInput?: UpdateSellerClaimAccountInput | null;
  fee?: number | null;
  feePayMethod?: ClaimFeePayMethod | null;
  phoneNumber?: string | null;
  picName?: string | null;
}

export interface UpdateSellerCrawlPolicyInput {
  isInspectingNew?: boolean | null;
  isUpdatingItems?: boolean | null;
}

export interface UpdateSellerInput {
  businessCode?: string | null;
  businessName?: string | null;
  csNotiPhoneNumber?: string | null;
  email?: string | null;
  kakaoTalkCode?: string | null;
  mailOrderBusinessCode?: string | null;
  operationTimeMessage?: string | null;
  orderNotiPhoneNumber?: string | null;
  phoneNumber?: string | null;
  representativeName?: string | null;
}

export interface UpdateSellerReturnAddressInput {
  baseAddress?: string | null;
  detailAddress?: string | null;
  postalCode?: string | null;
}

export interface UpdateSellerSettleAccountInput {
  bankCode?: InicisBankCode | null;
  number?: string | null;
  ownerName?: string | null;
}

export interface UpdateSellerSettlePolicyInput {
  accountInput?: UpdateSellerSettleAccountInput | null;
  email?: string | null;
  phoneNumber?: string | null;
  picName?: string | null;
}

export interface UpdateSellerShippingPolicyInput {
  fee?: number | null;
  minimumAmountForFree?: number | null;
}

export interface UploadMultipleImageInput {
  files: any[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
