/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ItemFilter, PageInput, ItemNoticeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: Items
// ====================================================

export interface Items_items_majorCategory {
  __typename: "ItemCategory";
  id: number;
  name: string;
}

export interface Items_items_minorCategory {
  __typename: "ItemCategory";
  id: number;
  name: string;
}

export interface Items_items_products {
  __typename: "Product";
  stock: number;
}

export interface Items_items_notice {
  __typename: "ItemNotice";
  id: number;
  type: ItemNoticeType | null;
  message: string;
  startAt: any | null;
  endAt: any | null;
}

export interface Items_items_urls {
  __typename: "ItemUrl";
  isPrimary: boolean;
  url: string;
}

export interface Items_items {
  __typename: "Item";
  id: number;
  imageUrl: string;
  majorCategory: Items_items_majorCategory | null;
  minorCategory: Items_items_minorCategory | null;
  name: string;
  originalPrice: number;
  salePrice: number;
  finalPrice: number;
  products: Items_items_products[] | null;
  isInfiniteStock: boolean;
  isSoldout: boolean;
  reviewCount: number | null;
  purchasedCount: number | null;
  /**
   * 상품 안내 메세지입니다. 파트너어드민에서 입력할 수 있습니다.
   */
  notice: Items_items_notice | null;
  isMdRecommended: boolean;
  isSellable: boolean;
  urls: Items_items_urls[];
  createdAt: any;
}

export interface Items {
  items: Items_items[];
}

export interface ItemsVariables {
  itemFilter?: ItemFilter | null;
  pageInput?: PageInput | null;
}
