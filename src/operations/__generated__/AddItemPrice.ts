/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddItemPriceInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddItemPrice
// ====================================================

export interface AddItemPrice_addItemPrice {
  __typename: "ItemPrice";
  id: number;
}

export interface AddItemPrice {
  addItemPrice: AddItemPrice_addItemPrice;
}

export interface AddItemPriceVariables {
  itemId: number;
  addItemPriceInput: AddItemPriceInput;
}
