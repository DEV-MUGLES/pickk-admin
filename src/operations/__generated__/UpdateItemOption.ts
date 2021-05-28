/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateItemOptionInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateItemOption
// ====================================================

export interface UpdateItemOption_updateItemOption_values {
  __typename: "ItemOptionValue";
  id: number;
  name: string;
}

export interface UpdateItemOption_updateItemOption {
  __typename: "ItemOption";
  id: number;
  name: string;
  values: UpdateItemOption_updateItemOption_values[];
}

export interface UpdateItemOption {
  updateItemOption: UpdateItemOption_updateItemOption;
}

export interface UpdateItemOptionVariables {
  id: number;
  updateItemOptionInput: UpdateItemOptionInput;
}
