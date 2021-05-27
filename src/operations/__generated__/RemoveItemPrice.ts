/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveItemPrice
// ====================================================

export interface RemoveItemPrice_removeItemPrice {
  __typename: "Item";
  id: number;
}

export interface RemoveItemPrice {
  removeItemPrice: RemoveItemPrice_removeItemPrice;
}

export interface RemoveItemPriceVariables {
  itemId: number;
  priceId: number;
}
