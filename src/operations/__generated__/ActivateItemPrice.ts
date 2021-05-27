/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ActivateItemPrice
// ====================================================

export interface ActivateItemPrice_activateItemPrice {
  __typename: "Item";
  id: number;
}

export interface ActivateItemPrice {
  activateItemPrice: ActivateItemPrice_activateItemPrice;
}

export interface ActivateItemPriceVariables {
  itemId: number;
  priceId: number;
}
