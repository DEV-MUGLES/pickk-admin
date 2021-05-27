/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateItemPriceInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateItemPrice
// ====================================================

export interface UpdateItemPrice_updateItemPrice {
  __typename: "ItemPrice";
  id: number;
}

export interface UpdateItemPrice {
  updateItemPrice: UpdateItemPrice_updateItemPrice;
}

export interface UpdateItemPriceVariables {
  id: number;
  updateItemPriceInput: UpdateItemPriceInput;
}
