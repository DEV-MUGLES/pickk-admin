/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

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
  isMdRecommended?: boolean | null;
  isSellable?: boolean | null;
  majorCategoryId?: number | null;
  minorCategoryId?: number | null;
  name?: string | null;
}

export interface UploadMultipleImageInput {
  files: any[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
