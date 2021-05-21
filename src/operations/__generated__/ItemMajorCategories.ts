/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ItemMajorCategories
// ====================================================

export interface ItemMajorCategories_itemMajorCategories_children {
  __typename: "ItemCategory";
  id: number;
  name: string;
}

export interface ItemMajorCategories_itemMajorCategories {
  __typename: "ItemCategory";
  id: number;
  name: string;
  children: ItemMajorCategories_itemMajorCategories_children[];
}

export interface ItemMajorCategories {
  itemMajorCategories: ItemMajorCategories_itemMajorCategories[];
}
