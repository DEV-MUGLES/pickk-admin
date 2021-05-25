/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ItemPriceUnit } from "./globalTypes";

// ====================================================
// GraphQL fragment: ItemPriceFrag
// ====================================================

export interface ItemPriceFrag {
  __typename: "ItemPrice";
  createdAt: any;
  displayPrice: number | null;
  endAt: any | null;
  finalPrice: number;
  id: number;
  isActive: boolean;
  isBase: boolean;
  isCrawlUpdating: boolean;
  itemId: number;
  originalPrice: number;
  pickkDiscountAmount: number | null;
  pickkDiscountRate: number | null;
  sellPrice: number;
  startAt: any | null;
  unit: ItemPriceUnit | null;
  updatedAt: any;
}
