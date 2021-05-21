/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BulkUpdateItemInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: BulkUpdateItems
// ====================================================

export interface BulkUpdateItems {
  bulkUpdateItems: boolean;
}

export interface BulkUpdateItemsVariables {
  bulkUpdateItemInput: BulkUpdateItemInput;
  ids: number[];
}
