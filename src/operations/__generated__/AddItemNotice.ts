/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddItemNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddItemNotice
// ====================================================

export interface AddItemNotice_addItemNotice {
  __typename: "ItemNotice";
  id: number;
}

export interface AddItemNotice {
  addItemNotice: AddItemNotice_addItemNotice;
}

export interface AddItemNoticeVariables {
  itemId: number;
  addItemNoticeInput: AddItemNoticeInput;
}
