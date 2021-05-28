/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ItemOptionFrag
// ====================================================

export interface ItemOptionFrag_values {
  __typename: "ItemOptionValue";
  id: number;
  name: string;
}

export interface ItemOptionFrag {
  __typename: "ItemOption";
  id: number;
  name: string;
  values: ItemOptionFrag_values[];
}
