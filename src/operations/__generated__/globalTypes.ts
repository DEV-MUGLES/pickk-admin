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

export interface AddItemNoticeInput {
  endAt?: any | null;
  message: string;
  startAt?: any | null;
  type?: ItemNoticeType | null;
}

export interface BulkUpdateItemInput {
  isMdRecommended?: boolean | null;
  isSellable?: boolean | null;
  majorCategoryId?: number | null;
  minorCategoryId?: number | null;
}

export interface ItemFilter {
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

export interface UploadMultipleImageInput {
  files: any[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
