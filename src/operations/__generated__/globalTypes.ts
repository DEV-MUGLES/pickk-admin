/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

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

export interface UpdateItemInput {
  description?: string | null;
  imageUrl?: string | null;
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

export interface UploadMultipleImageInput {
  files: any[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
