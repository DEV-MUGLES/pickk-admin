/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateItemNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateItemNotice
// ====================================================

export interface UpdateItemNotice_updateItemNotice {
  __typename: "ItemNotice";
  id: number;
}

export interface UpdateItemNotice {
  updateItemNotice: UpdateItemNotice_updateItemNotice;
}

export interface UpdateItemNoticeVariables {
  itemId: number;
  updateItemNoticeInput: UpdateItemNoticeInput;
}
