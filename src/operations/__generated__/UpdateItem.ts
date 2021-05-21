/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateItemInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateItem
// ====================================================

export interface UpdateItem_updateItem {
  __typename: "Item";
  id: number;
}

export interface UpdateItem {
  updateItem: UpdateItem_updateItem;
}

export interface UpdateItemVariables {
  itemId: number;
  updateItemInput: UpdateItemInput;
}
