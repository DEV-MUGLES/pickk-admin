/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateItemOptionSetInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateOptionSet
// ====================================================

export interface CreateOptionSet_createItemOptionSet {
  __typename: "Item";
  id: number;
}

export interface CreateOptionSet {
  createItemOptionSet: CreateOptionSet_createItemOptionSet;
}

export interface CreateOptionSetVariables {
  id: number;
  createItemOptionSetInput: CreateItemOptionSetInput;
}
